import { Router } from "express";

import auth from "../middlewares/authorizationCheck.middleware.js";
import requestCheck from "../middlewares/requestCheck.middleware.js";
import { upload } from "../helpers/file-storage.js";
import { createParty, getParties, getPublicParties, getParty, getPartyPublic, deleteParty } from "../controllers/party.controller.js";
import { shapeParty } from "../helpers/shapeRequest/shapeRequest.js";

const router = Router();

router.post("/", auth, requestCheck(shapeParty), upload.fields([{ name: 'photos' }]), createParty);

router.get("/:id", auth, getParties);

router.get('/userparty/:id', auth, getParty);

router.get("/", getPublicParties);

router.get('/publicparty/:id', getPartyPublic);

router.delete("/", auth, deleteParty);

export default router;