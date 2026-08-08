const User = require("../models/User");
const NGOProfile = require("../models/NGOProfile");
const bcrypt = require("bcryptjs");

// ======================================
// Get Logged-in User Profile
// ======================================

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select(
            "-password"
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        let ngoProfile = null;

        if (user.role === "ngo") {
            ngoProfile = await NGOProfile.findOne({
                user: user._id,
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
            },
            ngoProfile: ngoProfile
                ? {
                      id: ngoProfile._id,
                      description: ngoProfile.description,
                      website: ngoProfile.website,
                      phone: ngoProfile.phone,
                      address: ngoProfile.address,
                  }
                : null,
        });
    } catch (error) {
        console.error("Get Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// ======================================
// Update Logged-in User Profile
// ======================================

const updateProfile = async (req, res) => {
    try {
        const {
            name,
            description,
            website,
            phone,
            address,
        } = req.body;

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Update user information
        if (name !== undefined) {
            if (!name.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Name cannot be empty.",
                });
            }

            user.name = name.trim();
        }

        await user.save();

        let ngoProfile = null;

        // Update NGO-specific information
        if (user.role === "ngo") {
            ngoProfile = await NGOProfile.findOne({
                user: user._id,
            });

            if (!ngoProfile) {
                return res.status(404).json({
                    success: false,
                    message: "NGO profile not found.",
                });
            }

            if (description !== undefined) {
                ngoProfile.description =
                    description.trim();
            }

            if (website !== undefined) {
                ngoProfile.website =
                    website.trim();
            }

            if (phone !== undefined) {
                ngoProfile.phone =
                    phone.trim();
            }

            if (address !== undefined) {
                ngoProfile.address =
                    address.trim();
            }

            await ngoProfile.save();
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
            },
            ngoProfile: ngoProfile
                ? {
                      id: ngoProfile._id,
                      description: ngoProfile.description,
                      website: ngoProfile.website,
                      phone: ngoProfile.phone,
                      address: ngoProfile.address,
                  }
                : null,
        });
    } catch (error) {
        console.error("Update Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// ======================================
// Change Password
// ======================================

const changePassword = async (req, res) => {
    try {
        const {
            currentPassword,
            newPassword,
        } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "Current password and new password are required.",
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message:
                    "New password must be at least 6 characters.",
            });
        }

        const user = await User.findById(
            req.user.userId
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect.",
            });
        }

        user.password = await bcrypt.hash(
            newPassword,
            10
        );

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully.",
        });
    } catch (error) {
        console.error("Change Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    changePassword,
};