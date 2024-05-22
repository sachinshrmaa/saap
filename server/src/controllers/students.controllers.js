import bycrypt from "bcryptjs";
import { getUserByEmail } from "../repository/users.js";
import {
  addStudent,
  getStudentsByBatchCode,
} from "../repository/students.repository.js";

export const registerStudent = async (req, res) => {
  const { name, email, password, phone, gender, batchCode, rollNumber } =
    req.body;
  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !gender ||
    !batchCode ||
    !rollNumber
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const studentData = {
    name,
    email,
    password,
    phone,
    role: "STUDENT",
    emailVerified: false,
    status: "active",
    gender,
    batchCode,
    rollNumber,
  };

  studentData.password = bycrypt.hashSync(password, 10);

  try {
    // @TODO: Check if the batchCode exists
    if (await getUserByEmail(email))
      return res.status(400).json({ message: "Student already exists" });

    const user = await addStudent(studentData);
    user.password = undefined;
    res.status(201).json({ message: "Student registered sucessfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudents = async (req, res) => {
  const { batchCode } = req.body;
  if (!batchCode) {
    return res.status(400).json({ message: "Batch code is required" });
  }
  try {
    const students = await getStudentsByBatchCode(batchCode);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
