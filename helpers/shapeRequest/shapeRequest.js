import * as yup from 'yup';

const shapeLogin = {
    shape: {
        email: yup.string().email().required(),
        password: yup.string().required(),
    }
}

const shapeRegister = {
    shape: {
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
    }
}

const updatePassword = {
    shape: {
        lastPassword: yup.string().required(),
        newPassword: yup.string().required(),
    }
}

export { shapeLogin, shapeRegister, updatePassword };