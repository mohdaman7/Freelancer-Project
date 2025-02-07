import joi from 'joi';


const DeveloperAuthJoi = joi.object({
  firstName: joi.string().min(2).max(30).required(),
  lastName: joi.string().min(2).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
  title: joi.string().required(),
  hourlyRate: joi.number().min(5).required(),
  country: joi.string().required(),
  skills: joi.array()
    .items(
      joi.object({
        name: joi.string().required(),
        experience: joi.string().valid("Beginner", "Intermediate", "Expert").required(),
      })
    )
    .min(1)
    .required(),
  experienceLevel: joi.string().valid("Junior", "Mid-Level", "Senior").required(),
  githubUrl: joi.string().uri().allow("").optional(),
  linkedinUrl: joi.string().uri().allow("").optional(),
  profilePhoto: joi.string().allow("").optional(),
  bio: joi.string().allow("").optional(),
  rating: joi.number().min(0).max(5).optional(),
  status: joi.boolean().optional(),
});



const validateDeveloper = (req, res, next) => {
  const { error } = DeveloperAuthJoi.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ errors: error.details.map((err) => err.message) });
  }
  next();
};

export default validateDeveloper;
