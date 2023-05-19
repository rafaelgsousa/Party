import * as yup from 'yup';

const requestCheck = ({ shape }) => async (req, res, next) => {
    try {
      const schema = yup.object().shape(shape);
  
      await schema.validate(req.body);
      return next();
    } catch (error) {
      console.log("🚀 ~ file: requestCheck.middleware.js:12 ~ requestCheck ~ error:", error);
      return res.status(500).json({ message: error.message });
    }
  };

export default requestCheck;