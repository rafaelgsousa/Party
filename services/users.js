import User from "../models/user.model.js";

const findUserByEmail = async (email) => {
    const user = await User.findOne({ email });

    return user;
}

const findUserByIdNoPassword = async (id) => {
    const user = await User.findById({_id: id}, { password: 0 });

    return user;
}

const findUserById = async (id) => {
    const user = await User.findById({_id: id});

    return user;
}

const updateUserById = async (id, data) => {
    const result = await User.updateOne({ _id: id }, { $set: data }, { new: true });

    return result;
}

export { findUserByEmail, findUserById, findUserByIdNoPassword, updateUserById };
