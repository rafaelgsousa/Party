import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { register } from "../controllers/users.controller.js";

const router = Router();

router.post("/register", register);

export default router;
