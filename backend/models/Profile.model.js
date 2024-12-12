import mongoose from 'mongoose';
const profileSchema = new mongoose.Schema(
    {
        name: {
            type: String, required: true, trim: true,
            index: true,
        },
        email: {
            type: String, required: true, unique: true, trim: true,
            index: true,
        },
        phoneNumber: {
            type: String, required: true, trim: true,
            index: true,
        },
        description: {
            type: String, trim: true,
            index: true,
        },
        profileImageUrl: {
            type: String, trim: true,
            index: true,
        },
        latitude: {
            type: Number, min: -90, max: 90,
            index: true,
        },
        longitude: {
            type: Number, min: -180, max: 180,
            index: true,
        },
        address: {
            type: String, trim: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Profile = mongoose.model("Profile", profileSchema);