import joi from 'joi';

const ClientAuthJoi = joi.object({
  name: joi.string().min(3).max(30).required()
    .messages({
      'string.empty': 'Username is required',
      'string.min': 'Username should have at least 3 characters',
      'string.max': 'Username should not exceed 30 characters',
      'any.required': 'Username is a required field',
    }),

  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'org', 'io', 'co'] }, // Added more TLDs
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

export default ClientAuthJoi;