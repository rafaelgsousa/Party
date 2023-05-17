import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import db from "./db/connect.js";
import router from "./routes/user.route.js";

dotenv.config();

const app = new express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

try {
    db.once("open", () => {
        console.log("DB connected");
    });

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
} catch (error) {
    console.error(error);
}