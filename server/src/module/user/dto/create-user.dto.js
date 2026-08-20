import Joi from 'joi';
import createError from 'http-errors';

const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.min': 'Name must be greater than 2 characters',
    'any.required': 'Name is required',
  }),

  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email',
    'any.required': 'Email is required',
  }),

  password: Joi.string().min(7).required().messages({
    'string.min': 'Password must be at least 7 characters',
    'any.required': 'Password is required',
  }),

  role: Joi.string().valid('admin', 'user').default('user').messages({
    'any.only': 'Role must be either admin or user',
  }),
});

const validateCreateUser = (req, res, next) => {
  const { error, value } = createUserSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error)
    throw createError(
      400,
      error.details.map((detail) => detail.message),
    );
  req.body = value;

  next();
};

export default validateCreateUser;
