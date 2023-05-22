import Party from "../models/party.model.js";

const getPartiesByIdUser = async(id) => {
    const parties = await Party.find({ userId: id }).sort({ _id: -1 });

    return parties;
}

const getPartiesNotPrivate = async() => {
    const parties = await Party.find({ privacy: false }).sort({ _id: -1 });

    return parties;
}

const getPartyById = async(id) => {
    const party = await Party.findById(id).exec();

    return party;
}

const deletePartyById = async(_id, userId) => {
    const party = await Party.deleteOne({ _id, userId }).exec();

    return party;
}

export { getPartiesByIdUser, getPartiesNotPrivate, getPartyById, deletePartyById };