import { Profile } from "../models/Profile.model.js";
// Create a new profile
export const createProfile = async (req, res) => {
    console.log("Request body:", req.body); // Add this for debugging
    const { name, email, phoneNumber, description, profileImageUrl, address ,latitude,longitude } = req.body;
    try {
        if (!name || !email || !phoneNumber || !description || !profileImageUrl || !address || !latitude || !longitude) {
            return res
                .status(400)
                .json({ message: "All required fields must be provided" });
        }
        const profile = await Profile.create({
            name,
            email,
            phoneNumber,
            description,
            profileImageUrl,
            address,
            latitude,
            longitude,
        });
        res.status(201).json(profile);
    } catch (error) {
        console.error("Error creating profile:", error.message);
        res.status(500).json({ message: error.message });
    }
};


// Get all profiles
export const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a profile by ID
export const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: "Profile not found" });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a profile
export const updateProfile = async (req, res) => {
    try {
        // The correct way to pass the id for findByIdAndUpdate
        const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
            new: true,  // Return the updated profile
        });

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a profile
export const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (!profile) return res.status(404).json({ message: "Profile not found" });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};