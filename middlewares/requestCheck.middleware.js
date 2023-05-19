import { object } from 'yup';

const requestCheck = ({shape}) => async (req, res, next) => {
    try {
        const schema = object().shape(shape);

        await schema.validate(req.body, { abortEarly: false });

        return next();

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default requestCheck;