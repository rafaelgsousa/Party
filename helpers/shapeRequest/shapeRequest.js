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
        password: yup.string('The password must be a string').required(),
        confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
    }
}

export { shapeLogin, shapeRegister };