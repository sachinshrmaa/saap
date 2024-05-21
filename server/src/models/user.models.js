import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    email: {
      type: String,
      required: "Email is required",
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
      required: "Password is required",
    },
    role: {
      type: String,
    },
    status: {
      type: String,
      default: "active",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  roll_no: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
});

const batchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  start_year: {
    type: Number,
    required: true,
  },
  end_year: {},
  status: {},
});

const User = mongoose.model("User", userSchema);
const Student = mongoose.model("Student", studentSchema);

export { User, Student };
