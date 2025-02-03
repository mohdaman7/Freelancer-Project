import joi from 'joi';

// Register validation schema
const ClientRegisterJoi = joi.object({
  name: joi.string().min(3).max(30).required()
    .messages({
      'string.empty': 'name is required',
      'string.min': 'name should have at least 3 characters',
      'string.max': 'name should not exceed 30 characters',
      'any.required': 'name is a required field',
    }),

  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'org', 'io', 'co'] },
  }).lowercase().required().trim()
    .messages({
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is a required field',
    }),

  password: joi.string().min(8).required()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
    .messages({
      'string.pattern.base': 'Password must contain only alphanumeric characters',
      'string.min': 'Password should have at least 8 characters',
      'string.max': 'Password should not exceed 30 characters',
      'any.required': 'Password is a required field',
    }),

  company: joi.string().min(2).max(50).optional()
    .messages({
      'string.min': 'Company name should have at least 2 characters',
      'string.max': 'Company name should not exceed 50 characters',
    }),
});

// Login validation schema (only email and password)
const ClientLoginJoi = joi.object({
  email: joi.string().email().required()
    .messages({
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is a required field',
    }),

  password: joi.string().min(8).required()
    .messages({
      'string.min': 'Password should have at least 8 characters',
      'any.required': 'Password is a required field',
    }),
});

export { ClientRegisterJoi, ClientLoginJoi };
