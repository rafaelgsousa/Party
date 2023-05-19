import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { findUserByIdNoPassword } from '../services/users.js';

dotenv.config();

const authorizationCheck = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
    
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET);

        if (!verify) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await findUserByIdNoPassword(verify._id);

        req.user = user;

        return next();

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default authorizationCheck;