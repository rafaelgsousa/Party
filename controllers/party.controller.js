import jwt from "jsonwebtoken";
import multer from "multer";

import Party from "../models/party.model.js";
import User from "../models/user.model.js";
import { diskStorage } from "../helpers/file-storage.js";
import { findUserById } from "../services/users.js";
import { getPartiesByIdUser, getPartiesNotPrivate, getPartyById, deletePartyById } from "../services/party.js";

const createParty = async (req, res) => {
    try {
        const { title, description, date, privacy } = req.body;
        const userByToken = req.user;
        let files = [];

        if (req.files) {
            files = req.files.photos;
        }

        if (!title || !description || !date) {
            return res.status(400).json({ message: "Title, description and date are required!" });
        }

        const user = await findUserById(userByToken._id.toString());

        let photos = [];

        if (files.length > 0) {
            files.forEach(async (photo, i) => {
                photos[i] = photo.path;
            });
        }

        const party = new Party({
            title,
            description,
            date,
            photos,
            privacy,
            userId: user._id.toString(),
        });

        await party.save();

        return res.status(201).json({ message: "Party created successfully!", data: party });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
}

const getParties = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req;
        if (!id) {
            return res.status(400).json({ message: "Id is required!" });
        }

        if (user._id.toString() !== id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const parties = await getPartiesByIdUser(id);

        return res.status(200).json({ message: "Parties fetched successfully!", data: parties });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getPartiesPublics = async (_req, res) => {
    try {
        const parties = await getPartiesNotPrivate();

        return res.status(200).json({ message: "Public parties!", data: parties });
    } catch (error) {
        console.log("🚀 ~ file: party.controller.js:79 ~ getPartiesPublics ~ error:", error)
        return res.status(500).json({ message: error.message });
    }
}

const getParty = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req;
        const party = await getPartyById(id.toString());

        if (!party) {
            return res.status(404).json({ message: "Party not found!" });
        }

        if (user._id.toString() !== party.userId.toString()) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        return res.status(200).json({ message: "Party fetched successfully!", data: party });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getPartyPublic = async (req, res) => {
    try {
        const { id } = req.params;
        const party = await getPartyById(id.toString());

        if (!party) {
            return res.status(404).json({ message: "Party not found!" });
        }

        if (party.privacy) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        return res.status(200).json({ message: "Party fetched successfully!", data: party });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteParty = async (req, res) => {
    try {
        const { user } = req;
        const data = req.body;

        if (!data._id) {
            return res.status(400).json({ message: "Id is required!" });
        }

        if (user._id.toString() !== data.userId.toString()) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const party = await deletePartyById(data._id.toString(), user._id.toString());

        if (!party) {
            return res.status(404).json({ message: "Party not found!" });
        }

        return res.status(200).json({ message: "Party deleted successfully!", data: party });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { createParty, getParties, getPartiesPublics, getParty, getPartyPublic, deleteParty };