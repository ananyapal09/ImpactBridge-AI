const mongoose = require("mongoose");

const ngoProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },

        website: {
            type: String,
            trim: true,
        },

        phone: {
            type: String,
            trim: true,
        },

        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("NGOProfile", ngoProfileSchema);