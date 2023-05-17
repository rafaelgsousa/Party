import { Router } from "express";

import Party from "../models/party.model.js";

const router = Router();

router.get("/", (_req, res) => {
    res.send("Hello World");
}
);

export default router;