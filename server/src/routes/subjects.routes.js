import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireTeacher } from "../middlewares/rbac.middleware.js";
import { listSubjectsByTeacherAndBatch } from "../controllers/subjects.controller.js";
const router = Router();

// @PATH:  /api/v1/attendance/log
// @METHOD: POST
// @DESC: Log attendance
// @AUTH: required, teacher
router.post("/list-for-logging", requireAuth, requireTeacher, listSubjectsByTeacherAndBatch)

export default router;