const healthCheck = (req, res) => {
    res.status(200).json({
        success: true,
        message: "ImpactBridge API is running 🚀"
    });
};

module.exports = {
    healthCheck
};