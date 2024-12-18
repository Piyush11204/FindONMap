import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
	loginUser,
	logoutUser,
	registerUser,
} from "../controllers/auth.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(verifyJWT, logoutUser);

export default userRouter; 
