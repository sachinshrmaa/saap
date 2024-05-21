import { Router } from "express";
import { logIn, signUp } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/signup", signUp);
router.post("/login", logIn);

export default router;
