import { Router } from "express";

import { getUserById, updateUserDataById, updateUserPasswordById } from "../controllers/users.controller.js";
import auth from "../middlewares/authorizationCheck.middleware.js";
import requestCheck from "../middlewares/requestCheck.middleware.js";
import { updatePassword } from "../helpers/shapeRequest/shapeRequest.js";

const router = Router();

router.get("/:id", auth, getUserById);

router.patch("/:id", auth, updateUserDataById);

router.patch("/update-password/:id", auth, requestCheck(updatePassword), updateUserPasswordById);

export default router;
