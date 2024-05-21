import { User } from "../models/user.models.js";
import { generateToken } from "../utils/auth.utils.js";

// Sign up
const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  const savedUser = await newUser.save();

  res.status(201).json({ message: "User registered sucessfully", savedUser });
};

// Log in
const logIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User does not exists" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid credentials" });
  } else {
    const token = generateToken({ userId: user._id });
    res.cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Logged in successfully" });
  }
};

export { signUp, logIn };
