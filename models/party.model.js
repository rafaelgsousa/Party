import mongoose from "mongoose";


const partySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
    },
    photos: {
        type: Array,
    },
    privacy: {
        type: Boolean,
    },
    userId: {
        type: mongoose.ObjectId,
    }
});

const Party = mongoose.model("Party", partySchema);

export default Party;