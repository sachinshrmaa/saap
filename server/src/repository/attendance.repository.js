import { getClient, getPool } from "../db/postgres.js";

export const logStudentAttendance = async (logData) => {
  const client = await getClient();
  try {
    // Begin Transaction
    client.query("BEGIN");
    let query =
      "INSERT INTO attendance_log (batch_code, subject_code, teacher_id, remarks) VALUES ($1, $2, $3, $4) RETURNING *";
    let values = [
      logData.batchCode,
      logData.subjectCode,
      logData.teacherId,
      logData.remarks,
    ];
    const attendanceLog = await client.query(query, values);

    // Build Query to insert absent students
    let studentAttendanceQuery =
      "INSERT INTO student_attendance_log (log_id, roll_number, isPresent, batch_code, subject_code) VALUES ";
    for (let i = 0; i < logData.absentStudents.length; i++) {
      studentAttendanceQuery += `('${attendanceLog.rows[0].id}', '${logData.absentStudents[i]}', 'false', '${logData.batchCode}', '${logData.subjectCode}'),`;
    }

    for (let i = 0; i < logData.presentStudents.length; i++) {
      studentAttendanceQuery += `('${attendanceLog.rows[0].id}', '${logData.presentStudents[i]}', 'true', '${logData.batchCode}', '${logData.subjectCode}'),`;
    }

    // Remove the last comma
    studentAttendanceQuery = studentAttendanceQuery.slice(0, -1);
    console.log("Absent Students Query:", studentAttendanceQuery);

    // Insert the log
    await client.query(studentAttendanceQuery);
    // Commit the transaction
    client.query("COMMIT");
  } catch (error) {
    // If any error occurs, rollback the transaction
    client.query("ROLLBACK");
    console.log("Failed to log attendance", error);
    throw new Error(error.message);
  } finally {
    client.release();
  }
};

export const getStudentAttendanceById = async (id) => {
  const client = await getClient();
  try {
    let query = "SELECT * from students WHERE user_id = $1";
    let values = [id];

    let student = await client.query(query, values);
    student = student.rows[0];

    // Get all Subjects
    query = `select 
        al.subject_code, 
        s.subject_name,
        count(*) total_classes, 
        (select count(ispresent) from student_attendance_log sal where sal.subject_code= al.subject_code and sal.isPresent = true and sal.roll_number = $2) present  
    from attendance_log al 
    inner join subjects s ON s.subject_code = al.subject_code 
    where batch_code = $1 group by al.subject_code, s.subject_name`;
    values = [student.batch_code, student.roll_number];

    let attendance = await client.query(query, values);
    return attendance.rows;

    // Get Subjectwise total classes
  } catch (error) {
    console.log("Failed to get student attendance", error);
    throw new Error(error.message);
  } finally {
    client.release();
  }
};
