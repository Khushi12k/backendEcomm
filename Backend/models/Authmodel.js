import { Schema, model } from "mongoose";

const authSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true},
    username: { type: String, required: true, unique: true, min: 4, max: 30 },
    password: { type: String, min: 4, max: 30 },
    image: { type: String },
    role: { type: String }
})

const Auth = model("auths", authSchema, "auths")
export default Auth