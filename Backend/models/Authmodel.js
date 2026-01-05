import { Schema, model } from "mongoose";

const authSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: {
      type: String,
      validate: {
        validator: v => !v || /^\d+$/.test(v),
        message: "Phone must contain only numbers",
      },
    },
    username: { type: String, unique: true },
    password: { type: String },
    image: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isBlocked: { type: Boolean, default: false },
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    googleId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

const Auth = model("Auth", authSchema);
export default Auth;







// import { Schema, model } from "mongoose";

// const authSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phone: { type: String, required: true },
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       min: 4,
//       max: 30,
//     },
//     password: { type: String, min: 4, max: 30 },
//     image: { type: String },
//     role: { type: String },

//     /* ================= BLOCK SYSTEM ================= */
//     isBlocked: {
//       type: Boolean,
//       default: false,
//     },
//     blockedAt: {
//       type: Date,
//       default: null,
//     },
//     blockReason: {
//       type: String,
//       default: null,
//     },
//     /* ================================================ */
//   },
//   { timestamps: true }
// );

// const Auth = model("auths", authSchema, "auths");
// export default Auth;
