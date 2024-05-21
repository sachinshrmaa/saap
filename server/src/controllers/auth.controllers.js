import { generateToken } from "../utils/auth.utils.js";
import { createUser, getUserByEmail } from "../repository/users.js";
import bycrypt from "bcryptjs";

// Sign up
const signUp = async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const userData = {
    name,
    email,
    password,
    phone,
    role: "STUDENT",
    emailVerified: false,
    status: "active",
  };

  userData.password = bycrypt.hashSync(password, 10);
  
  try {
    if (await getUserByEmail(email))
      return res.status(400).json({ message: "User already exists" });

    const user = await createUser(userData);
    user.password = undefined;
    res.status(201).json({ message: "User registered sucessfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Log in
const logIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let user;
  try {
    user = await getUserByEmail(email);
  } catch (error) {
    console.log("Failed to fetch User:", error)
    return res.status(500).json({ message: error.message });
  }

  if (user === null) {
    return res.status(400).json({ message: "User does not exists" });
  }

  if (!bycrypt.compareSync(password, user.password)){
    return res.status(400).json({ message: "Invalid credentials" });
  } else {
    const token = generateToken({ userId: user.id });
    res.cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    user.password = undefined;
    return res.status(200).json({ message: "Logged in successfully", user});
  }
};

export { signUp, logIn };
