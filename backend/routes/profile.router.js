import {
    deleteProfile,
    getProfiles,
    getProfileById,
    createProfile,
    updateProfile,
} from "../controllers/profile.controller.js";
import {uploadProfileImage} from "../middlewares/multer.middleware.js"

import { Router } from "express";
const router = Router();

// Create a new profile
router.post("/create", createProfile);

// Get all profiles
router.get("/getall", getProfiles);

// Get a profile by ID
router.get("/:id", getProfileById);

// Update a profile
router.put("/:id", updateProfile);

// Delete a profile
router.delete("/:id", deleteProfile);

export default router;