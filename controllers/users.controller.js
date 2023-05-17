import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
import checkString from "../helpers/checkString.js";

import User from "../models/user.model.js";


const register = async (req, res) => {    
    try {
        const { name, email, password, confirmePassword } = req.body;

        const checkEmail = await User.findOne({ email: email });

        if (password !== confirmePassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (!checkString(password)) {
            return res.status(400).json({ message: "Password do not match" });
        }

        if (!name || !email || !password || !confirmePassword) {
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
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            await user.save();

            res.status(201).json({ name: user.name, email: user.email, token, message: "User created successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { register };