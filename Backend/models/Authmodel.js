import { Schema, model } from "mongoose";

const authSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    phone: {
      type: String,
      validate: {
        validator: (v) => !v || /^\d+$/.test(v),
        message: "Phone must contain only numbers",
      },
    },

    username: { type: String, unique: true },
    password: { type: String },
    image: { type: String },

    role: { type: String, enum: ["user", "admin"], default: "user" },
    isBlocked: { type: Boolean, default: false },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: { type: String, unique: true, sparse: true },

    /* ===== EMAIL VERIFICATION ===== */
    isVerified: { type: Boolean, default: false },

    /* ===== LOGIN OTP (FIX) ===== */
    emailOtp: { type: String },
    otpExpiry: { type: Date },
    isOtpVerified: { type: Boolean, default: false }, // ✅ FIX ADDED
  },
  { timestamps: true }
);

const Auth = model("Auth", authSchema);
export default Auth;

