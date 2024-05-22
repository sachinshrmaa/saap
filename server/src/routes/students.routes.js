import { Router } from "express";
import {
  registerStudent,
  getStudents,
} from "../controllers/students.controllers.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireTeacher } from "../middlewares/rbac.middleware.js";

const router = Router();

router.post("/register", requireAuth, requireTeacher, registerStudent);
router.post("/list", requireAuth, requireTeacher, getStudents);

export default router;
