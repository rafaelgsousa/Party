import * as yup from 'yup';

const requestCheck = ({ shape }) => async (req, res, next) => {
    try {
      const schema = yup.object().shape(shape);
  
      await schema.validate(req.body);
      return next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

export default requestCheck;