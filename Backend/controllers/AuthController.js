import Auth from "../models/Authmodel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import "dotenv/config"

import bcrypt from "bcrypt"

export async function getUsers(req, res) {
    try {
        const auth = await Auth.find()
        return res.status(200).json(auth)
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export async function registerUser(req, res) {
    try {
        const data = req.body;

        const existEmail = await Auth.findOne({ email: data.email });
        if (existEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const existUser = await Auth.findOne({ username: data.username })
        if (existUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        // const existPhone = await Auth.findOne({ phone: data.phone });
        // if (existPhone) {
        //     return res.status(400).json({ message: "Phone already exists" });

        // };

        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        const newUser = new Auth(data);
        console.log(newUser);
        
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser })
    }

    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export async function loginUsers(req, res) {
    try {
        const data = req.body;

        const user = await Auth.findOne({ email: data.email });
        if (!user) return res.status(400).json({ message: "Email not found" });

        const match = await bcrypt.compare(data.password, user.password);
        if (!match) return res.status(400).json({ message: "Incorrect password" });

        //generate token
        const auth_token = jwt.sign({
            id: user._id,
            role: user.role,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.cookie("auth_token", auth_token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 3600*1000,
        })


        return res.status(200).json({ message: "Login success", user });
    }

    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export async function logoutUsers(req, res) {
    try {
        return res.status(200).json({ message: "Logout success" });
    }

    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export async function deleteUsers(req, res) {

    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Id Parameter is required" });
        }
        const userDeleted = await Auth.findByIdAndDelete(id);
        if (!userDeleted) {
            return res.status(404).json({ message: "User not found with this parameter" });
        }
        return res.status(200).json({ message: "User deleted" });
    }

    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export async function updateUsers(req, res) {

    try {
        const { id } = req.params;
        const updates = req.body;

        if (!id) {
            return res.status(400).json({ message: "Id Parameter is required" });
        }

        const userUpdate = await Auth.findByIdAndUpdate(id, updates,
            { new: true });

        if (!userUpdate) {
            return res.status(404).json({ message: "User not found with this parameter" });
        }
        return res.status(200).json({ message: "User updated successfully" });



    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }

}


