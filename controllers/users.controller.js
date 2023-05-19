import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongoose";

import checkString from "../helpers/checkString.js";
import User from "../models/user.model.js";
import { findUserByEmail, findUserById, findUserByIdNoPassword, updateUserById } from "../services/users.js";

dotenv.config();

const register = async (req, res) => {    
    try {
        const { name, email, password, confirmPassword } = req.body;

        const checkEmail = await findUserByEmail(email);

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (!checkString(password)) {
            return res.status(400).json({ message: "Password do not match" });
        }

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        if (checkEmail) {
            return res.status(400).json({ message: "bad record" });
        } else {
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({
                name,
                email,
                password: hashedPassword,
            });

            const token = jwt.sign(
                { _id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            await user.save();

            return res.status(201).json({ name: user.name, email: user.email, token, message: "User created successfully" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {    
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        console.log("🚀 ~ file: users.controller.js:67 ~ login ~ isMatch:", isMatch)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({ name: user.name, email: user.email, token, message: "Login successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await findUserByIdNoPassword(id);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        return res.status(200).json({ name: user.name, email: user.email, message: "Get user successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateUserDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const { user } = await req;

        if (`${user._id}` !== id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const result = await updateUserById(id, data);

        if (!result) {
            return res.status(400).json({ message: "User not found" });
        }

        return res.status(200).json({ name: user.name, email: user.email, message: "Update user successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateUserPasswordById = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req;
        const { lastPassword, newPassword } = req.body;
    
        if (`${user._id}` !== id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    
        const checkUser = await findUserById(id);
    
        const checkPassword = bcrypt.compareSync(lastPassword, checkUser.password);
    
        if (!checkPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
    
        const salt = await bcrypt.genSalt(12);
        const password = await bcrypt.hash(newPassword, salt);
    
        const result = await updateUserById(id, { password });
    
        if (!result) {
            return res.status(400).json({ message: "User not found" });
        }
    
        return res.status(200).json({ message: "Update password successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export { register, login, getUserById, updateUserDataById, updateUserPasswordById };