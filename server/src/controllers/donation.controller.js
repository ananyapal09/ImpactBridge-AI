const Razorpay = require("../config/razorpay");
const crypto = require("crypto");
const QRCode = require("qrcode");


const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");

// ======================================
// Create Razorpay Order
// ======================================
const createOrder = async (req, res) => {
    try {
        const { campaignId, amount } = req.body;

        if (!campaignId || amount === undefined) {
            return res.status(400).json({
                success: false,
                message: "Campaign ID and amount are required.",
            });
        }

        const donationAmount = Number(amount);

        if (!Number.isFinite(donationAmount)) {
            return res.status(400).json({
                success: false,
                message: "Invalid donation amount.",
            });
        }

        if (donationAmount < 10) {
            return res.status(400).json({
                success: false,
                message: "Minimum donation amount is ₹10.",
            });
        }

        const campaign = await Campaign.findById(campaignId);

        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: "Campaign not found.",
            });
        }

        if (
            campaign.status === "completed" ||
            campaign.status === "closed"
        ) {
            return res.status(400).json({
                success: false,
                message: "This campaign is no longer accepting donations.",
            });
        }

        if (campaign.raisedAmount >= campaign.goalAmount) {
            return res.status(400).json({
                success: false,
                message: "This campaign has already reached its goal.",
            });
        }

        const remaining =
            campaign.goalAmount - campaign.raisedAmount;

        if (donationAmount > remaining) {
            return res.status(400).json({
                success: false,
                message: `Donation cannot exceed the remaining campaign goal of ₹${remaining}.`,
            });
        }

        const options = {
            amount: Math.round(donationAmount * 100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await Razorpay.orders.create(options);

        return res.status(200).json({
            success: true,
            order,
        });

    } catch (err) {
        console.error("Create Razorpay Order Error:", err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


// ======================================
// Verify Razorpay Payment
// ======================================
const verifyPayment = async (req, res) => {
    try {
        const {
            campaignId,
            amount,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        // Check if payment was already processed
        const existingDonation = await Donation.findOne({
            razorpayPaymentId: razorpay_payment_id,
        });

        if (existingDonation) {
            return res.status(200).json({
                success: true,
                message: "Payment already processed.",
                donation: existingDonation,
            });
        }

        // Create signature body
        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        // Generate expected signature
        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body)
            .digest("hex");

        // Verify signature
        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed.",
            });
        }

        // Check campaign
        const campaign = await Campaign.findById(campaignId);

        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: "Campaign not found.",
            });
        }

        // Save Donation
        const certificateId = `IB-CERT-${Date.now()}-${Math.random()
  .toString(36)
  .substring(2, 8)
  .toUpperCase()}`;

const donation = await Donation.create({
  donor: req.user.userId,
  campaign: campaignId,
  amount,

  razorpayOrderId: razorpay_order_id,
  razorpayPaymentId: razorpay_payment_id,
  razorpaySignature: razorpay_signature,

  paymentStatus: "success",

  certificateId,
  certificateIssued: true,
});

        // Update Campaign Raised Amount
        await Campaign.findByIdAndUpdate(
            campaignId,
            {
                $inc: {
                    raisedAmount: amount,
                },
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Donation successful.",
            donation,
        });

    } catch (err) {
        console.error("Verify Payment Error:", err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


// ======================================
// Get Logged-in User Donations
// ======================================
const getMyDonations = async (req, res) => {
    try {

        const donations = await Donation.find({
            donor: req.user.userId,
        })
            .populate({
                path: "campaign",
                select:
                    "title category image goalAmount raisedAmount ngo",
                populate: {
                    path: "ngo",
                    select: "description website phone address",
                },
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: donations.length,
            donations,
        });

    } catch (err) {
        console.error("Get Donations Error:", err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
// ======================================
// Download Donation Certificate
// ======================================
const downloadCertificate = async (req, res) => {
    try {
        const { id } = req.params;

        const donation = await Donation.findById(id)
            .populate("donor", "name email")
            .populate({
                path: "campaign",
                select: "title category ngo",
                populate: {
                    path: "ngo",
                    populate: {
                        path: "user",
                        select: "name",
                    },
                },
            });

        // Donation not found
        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found.",
            });
        }

        // Only the donor who made the donation can download it
        if (
            donation.donor._id.toString() !==
            req.user.userId.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this certificate.",
            });
        }

        // Certificate only for successful payments
        if (donation.paymentStatus !== "success") {
            return res.status(400).json({
                success: false,
                message:
                    "Certificate is available only for successful donations.",
            });
        }

        // Certificate must exist
        if (
            !donation.certificateIssued ||
            !donation.certificateId
        ) {
            return res.status(404).json({
                success: false,
                message: "Certificate not available for this donation.",
            });
        }

        const PDFDocument = require("pdfkit");

        // ======================================
        // CREATE PDF
        // ======================================

        const doc = new PDFDocument({
            size: "A4",
            margin: 0,
            autoFirstPage: true,
        });

        const filename =
            `ImpactBridge-Certificate-${donation.certificateId}.pdf`;

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${filename}"`
        );

        doc.pipe(res);

        // ======================================
        // PAGE SIZE
        // ======================================

        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;

        // ======================================
        // QR CODE
        // ======================================

        const verificationUrl =
            `${process.env.CLIENT_URL || "http://localhost:5173"}` +
            `/verify-certificate/${encodeURIComponent(
                donation.certificateId
            )}`;

        const qrBuffer = await QRCode.toBuffer(
            verificationUrl,
            {
                errorCorrectionLevel: "H",
                margin: 2,
                width: 300,
            }
        );

        // ======================================
        // BACKGROUND
        // ======================================

        doc
            .rect(
                0,
                0,
                pageWidth,
                pageHeight
            )
            .fill("#FFFDF7");

        // ======================================
        // BORDER
        // ======================================

        const outerMargin = 28;
        const innerMargin = 38;

        doc
            .lineWidth(2)
            .strokeColor("#14201B")
            .rect(
                outerMargin,
                outerMargin,
                pageWidth - outerMargin * 2,
                pageHeight - outerMargin * 2
            )
            .stroke();

        doc
            .lineWidth(0.8)
            .strokeColor("#E7B14C")
            .rect(
                innerMargin,
                innerMargin,
                pageWidth - innerMargin * 2,
                pageHeight - innerMargin * 2
            )
            .stroke();

        // ======================================
        // CORNER DECORATION
        // ======================================

        [
            [innerMargin, innerMargin],
            [pageWidth - innerMargin, innerMargin],
            [innerMargin, pageHeight - innerMargin],
            [pageWidth - innerMargin, pageHeight - innerMargin],
        ].forEach(([x, y]) => {
            doc.save();

            doc
                .translate(x, y)
                .rotate(45);

            doc
                .rect(-5, -5, 10, 10)
                .fill("#E7B14C");

            doc.restore();
        });

        // ======================================
        // HEADER
        // ======================================

        doc
            .font("Helvetica-Bold")
            .fontSize(28)
            .fillColor("#14201B")
            .text(
                "IMPACTBRIDGE",
                0,
                65,
                {
                    width: pageWidth,
                    align: "center",
                }
            );

        doc
            .font("Helvetica")
            .fontSize(10)
            .fillColor("#888888")
            .text(
                "AI-POWERED CROWDFUNDING & SOCIAL IMPACT",
                0,
                100,
                {
                    width: pageWidth,
                    align: "center",
                    characterSpacing: 1.3,
                }
            );

        doc
            .moveTo(
                pageWidth / 2 - 90,
                124
            )
            .lineTo(
                pageWidth / 2 + 90,
                124
            )
            .lineWidth(1)
            .strokeColor("#E7B14C")
            .stroke();

        // ======================================
        // TITLE
        // ======================================

        doc
            .font("Helvetica-Bold")
            .fontSize(24)
            .fillColor("#14201B")
            .text(
                "Certificate of Appreciation",
                0,
                155,
                {
                    width: pageWidth,
                    align: "center",
                }
            );

        // ======================================
        // DONOR
        // ======================================

        doc
            .font("Helvetica")
            .fontSize(12)
            .fillColor("#666666")
            .text(
                "This certificate is proudly presented to",
                0,
                205,
                {
                    width: pageWidth,
                    align: "center",
                }
            );

        doc
            .font("Helvetica-Bold")
            .fontSize(25)
            .fillColor("#14201B")
            .text(
                donation.donor.name,
                0,
                230,
                {
                    width: pageWidth,
                    align: "center",
                }
            );

        doc
            .moveTo(
                pageWidth / 2 - 110,
                265
            )
            .lineTo(
                pageWidth / 2 + 110,
                265
            )
            .lineWidth(0.7)
            .strokeColor("#CCCCCC")
            .stroke();

        // ======================================
        // CAMPAIGN
        // ======================================

        doc
            .font("Helvetica")
            .fontSize(12)
            .fillColor("#666666")
            .text(
                "in recognition of a generous contribution towards",
                0,
                285,
                {
                    width: pageWidth,
                    align: "center",
                }
            );

        doc
            .font("Helvetica-Bold")
            .fontSize(18)
            .fillColor("#14201B")
            .text(
                `"${donation.campaign.title}"`,
                55,
                308,
                {
                    width: pageWidth - 110,
                    align: "center",
                }
            );

        // ======================================
        // DONATION AMOUNT
        // ======================================

        const amountX = 148;
        const amountY = 350;
        const amountWidth = 300;
        const amountHeight = 72;

        doc
            .roundedRect(
                amountX,
                amountY,
                amountWidth,
                amountHeight,
                10
            )
            .fillAndStroke(
                "#F8F1DF",
                "#E7B14C"
            );

        doc
            .font("Helvetica")
            .fontSize(11)
            .fillColor("#8A7440")
            .text(
                "DONATION AMOUNT",
                amountX,
                amountY + 14,
                {
                    width: amountWidth,
                    align: "center",
                    characterSpacing: 1,
                }
            );

        doc
            .font("Helvetica-Bold")
            .fontSize(25)
            .fillColor("#14201B")
            .text(
                `Rs. ${Number(
                    donation.amount
                ).toLocaleString("en-IN")}`,
                amountX,
                amountY + 34,
                {
                    width: amountWidth,
                    align: "center",
                }
            );

        // ======================================
        // DETAILS
        // ======================================

        const detailsX = 80;
        const detailsY = 460;
        const lineGap = 25;

        const ngoName =
            donation.campaign.ngo?.user?.name ||
            "Verified NGO";

        const donationDate =
            new Date(
                donation.createdAt
            ).toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                }
            );

        doc
            .font("Helvetica")
            .fontSize(10.5)
            .fillColor("#555555")
            .text(
                "Campaign:",
                detailsX,
                detailsY,
                { continued: true }
            )
            .font("Helvetica-Bold")
            .fillColor("#14201B")
            .text(
                ` ${donation.campaign.title}`
            );

        doc
            .font("Helvetica")
            .fillColor("#555555")
            .text(
                "NGO:",
                detailsX,
                detailsY + lineGap,
                { continued: true }
            )
            .font("Helvetica-Bold")
            .fillColor("#14201B")
            .text(
                ` ${ngoName}`
            );

        doc
            .font("Helvetica")
            .fillColor("#555555")
            .text(
                "Donation Date:",
                detailsX,
                detailsY + lineGap * 2,
                { continued: true }
            )
            .font("Helvetica-Bold")
            .fillColor("#14201B")
            .text(
                ` ${donationDate}`
            );

        doc
            .font("Helvetica")
            .fillColor("#555555")
            .text(
                "Payment Status:",
                detailsX,
                detailsY + lineGap * 3,
                { continued: true }
            )
            .font("Helvetica-Bold")
            .fillColor("#1F7A4C")
            .text(
                " Verified"
            );

        // ======================================
        // ADMIN VERIFICATION STAMP
        // ======================================

        const sealCX = 510;
        const sealCY = 475;
        const sealR = 38;

        doc
            .lineWidth(1.8)
            .circle(
                sealCX,
                sealCY,
                sealR
            )
            .fillAndStroke(
                "#E7B14C",
                "#14201B"
            );

        doc
            .lineWidth(0.7)
            .strokeColor("#14201B")
            .circle(
                sealCX,
                sealCY,
                sealR - 6
            )
            .stroke();

        doc
            .font("Helvetica-Bold")
            .fontSize(9)
            .fillColor("#14201B")
            .text(
                "VERIFIED",
                sealCX - 35,
                sealCY - 10,
                {
                    width: 70,
                    align: "center",
                }
            );

        doc
            .font("Helvetica")
            .fontSize(6.5)
            .fillColor("#14201B")
            .text(
                "IMPACTBRIDGE",
                sealCX - 35,
                sealCY + 5,
                {
                    width: 70,
                    align: "center",
                }
            );

        // ======================================
        // QR CODE
        // ======================================

        const qrSize = 82;
        const qrX = 469;
        const qrY = 525;

        doc.image(
            qrBuffer,
            qrX,
            qrY,
            {
                width: qrSize,
                height: qrSize,
            }
        );

        doc
            .font("Helvetica")
            .fontSize(7.5)
            .fillColor("#777777")
            .text(
                "Scan to verify this donation",
                qrX - 20,
                qrY + qrSize + 7,
                {
                    width: qrSize + 40,
                    align: "center",
                }
            );

        // ======================================
        // FOOTER DIVIDER
        // ======================================

        doc
            .moveTo(80, 650)
            .lineTo(
                pageWidth - 80,
                650
            )
            .lineWidth(0.5)
            .strokeColor("#DDDDDD")
            .stroke();

        // ======================================
        // FOOTER MESSAGE
        // ======================================

        doc
            .font("Helvetica-Oblique")
            .fontSize(10)
            .fillColor("#888888")
            .text(
                "Your contribution helps create meaningful social impact.",
                0,
                670,
                {
                    width: pageWidth,
                    align: "center",
                }
            );

        // ======================================
        // CERTIFICATE ID
        // ======================================

        doc
            .font("Helvetica-Bold")
            .fontSize(9)
            .fillColor("#555555")
            .text(
                `Certificate ID: ${donation.certificateId}`,
                0,
                700,
                {
                    width: pageWidth,
                    align: "center",
                }
            );

        doc
            .font("Helvetica")
            .fontSize(7.5)
            .fillColor("#AAAAAA")
            .text(
                "This certificate is digitally linked to a verified ImpactBridge donation record.",
                0,
                718,
                {
                    width: pageWidth,
                    align: "center",
                }
            );

        // ======================================
        // END PDF
        // ======================================

        doc.end();

    } catch (error) {
        console.error(
            "Certificate Error:",
            error
        );

        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message:
                    "Unable to generate certificate.",
            });
        }
    }
};

// Verify Donation Certificate
// ======================================
const verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    if (!certificateId) {
      return res.status(400).json({
        success: false,
        message: "Certificate ID is required.",
      });
    }

    const donation = await Donation.findOne({
      certificateId,
      certificateIssued: true,
      paymentStatus: "success",
    })
      .populate("donor", "name")
      .populate({
        path: "campaign",
        select: "title category",
        populate: {
          path: "ngo",
          select: "description",
          populate: {
            path: "user",
            select: "name",
          },
        },
      });

    if (!donation) {
      return res.status(404).json({
        success: false,
        verified: false,
        message: "Certificate not found or invalid.",
      });
    }

    return res.status(200).json({
      success: true,
      verified: true,
      certificate: {
        certificateId: donation.certificateId,
        donorName: donation.donor.name,
        amount: donation.amount,
        campaignTitle: donation.campaign.title,
        category: donation.campaign.category,
        ngoName:
          donation.campaign.ngo?.user?.name ||
          "Verified NGO",
        donationDate: donation.createdAt,
        paymentStatus: donation.paymentStatus,
      },
    });
  } catch (error) {
    console.error("Certificate Verification Error:", error);

    return res.status(500).json({
      success: false,
      verified: false,
      message: "Unable to verify certificate.",
    });
  }
};

module.exports = {
    createOrder,
    verifyPayment,
    getMyDonations,
    downloadCertificate,
    verifyCertificate,

};