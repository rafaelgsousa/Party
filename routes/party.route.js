import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
    return res.send("Hello World");
}
);

export default router;