import User from "../models/user.model.js";

const findByEmail = async (email) => {
    const user = await User.findOne({ email });

    return user;
}

const findById = async (id) => {
    const user = await User.findById({_id: id}, { password: 0 });

    return user;
}

const updateById = async (id, data) => {
    const result = await User.updateOne({ _id: id }, { $set: data });

    return result;
}

export { findByEmail, findById, updateById };
