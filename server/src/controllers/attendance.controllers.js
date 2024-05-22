import { getStudentPresentRollNumbersByBatchCode } from "../repository/students.repository.js";
import {
  getStudentAttendanceById,
  logStudentAttendance,
} from "../repository/attendance.repository.js";

export const logAttendance = async (req, res) => {
  const { batchCode, absentStudents, subjectCode, remarks } = req.body;
  if (!batchCode || !absentStudents || !subjectCode) {
    return res.status(400).json({
      message:
        "All fields are required [batchCode, absentStudents, subjectCode, remarks]",
    });
  }
  //@TODO: Validate the batch_code and subject_code

  try {
    // get all the students (roll_numbers) from batch_code
    const presentStudents = await getStudentPresentRollNumbersByBatchCode(
      batchCode,
      absentStudents
    );
    console.log("Fetched Present Students:", presentStudents);

    // perform insert operation in the attendance table
    logStudentAttendance({
      batchCode,
      subjectCode,
      teacherId: req.user.id,
      remarks,
      absentStudents,
      presentStudents,
    });

    res.status(200).json({ message: "Attendance logged successfully" });
  } catch (error) {
    console.log("Failed to log attendance", error);
    res.status(500).json({ message: error.message });
  }
};

export const getStudentAttendance = async (req, res) => {
  try {
    console.log("User",req.user);
    const attendance = await getStudentAttendanceById(req.user.id);

    res.status(200).json(attendance);
  } catch (error) {
    console.log("Failed to get attendance", error);
    res.status(500).json({ message: error.message });
  }
};
