import joi from 'joi';

const DeveloperAuthJoi = joi.object({
  firstName: joi.string().min(2).max(30).required().messages({
    'string.empty': 'First name is required',
    'string.min': 'First name needs at least 2 characters',
    'any.required': 'First name is required',
  }),
  lastName: joi.string().min(2).max(30).required().messages({
    'string.empty': 'Last name is required',
    'string.min': 'Last name needs at least 2 characters',
  }),
  email: joi.string().email().required().messages({
    'string.email': 'Valid email required',
    'any.required': 'Email is required',
  }),
  password: joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required().messages({
    'string.pattern.base': 'Password must be alphanumeric',
    'string.min': 'Password needs at least 8 characters',
  }),
  title: joi.string().required().messages({
    'any.required': 'Professional title is required',
  }),
  hourlyRate: joi.number().min(5).required().messages({
    'number.min': 'Minimum rate is $5/hour',
  }),
  skills: joi.array()
    .items(
      joi.object({
        name: joi.string().required(),
        experience: joi.string().valid('Beginner', 'Intermediate', 'Expert').required(),
      })
    )
    .min(1)
    .required(),
  country: joi.string().required().messages({
    'string.empty': 'Country is required',
    'any.required': 'Country is required',
  }),
  experienceLevel: joi.string().valid('Junior', 'Mid-Level', 'Senior').required().messages({
    'any.required': 'Experience level is required',
  }),

  githubUrl: joi.string().uri().allow('').optional().messages({
    'string.uri': 'GitHub URL must be a valid URL',
  }),
  linkedinUrl: joi.string().uri().allow('').optional().messages({
    'string.uri': 'LinkedIn URL must be a valid URL',
  }),
  
});

// Middleware function for validation
const validateDeveloper = (req, res, next) => {
  const { error } = DeveloperAuthJoi.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ errors: error.details.map((err) => err.message) });
  }
  next();
};

export default validateDeveloper;
