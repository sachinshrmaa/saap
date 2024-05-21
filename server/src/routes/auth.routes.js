import { Router } from "express";
import { logIn, signUp } from "../controllers/auth.controllers.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/", requireAuth, (req, res) => {
  res.json({ message: "Authenticated", user: req.user});
});

export default router;
