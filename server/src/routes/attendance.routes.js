import { Router } from "express";
import {
  logAttendance,
  getStudentAttendance,
} from "../controllers/attendance.controllers.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireTeacher } from "../middlewares/rbac.middleware.js";
const router = Router();

// @PATH:  /api/v1/attendance/log
// @METHOD: POST
// @DESC: Log attendance
// @AUTH: required, teacher
router.post("/log", requireAuth, requireTeacher, logAttendance);
router.get("/attendance", requireAuth, getStudentAttendance);

export default router;
