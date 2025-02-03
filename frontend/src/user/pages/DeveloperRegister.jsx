import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DeveloperAuthJoi from '../validations/developerValidation';
import { Code, Briefcase, Globe, Github, Linkedin } from 'lucide-react';

const DeveloperRegister = () => {
  const [skills, setSkills] = useState([]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      title: '',
      hourlyRate: '',
      skills: [],
      country: ''
    },
    validationSchema: Yup.object({
      // Convert Joi schema to Yup or use Joi directly
    }),
    onSubmit: async (values) => {
      try {
        const { error } = DeveloperAuthJoi.validate(values);
        if (error) throw new Error(error.details[0].message);
        
        // Add API call to register developer
        console.log('Registration data:', values);
      } catch (err) {
        console.error('Registration error:', err.message);
      }
    }
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Code className="text-blue-600" /> Developer Registration
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.errors.firstName && (
            <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.errors.lastName && (
            <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Professional Title</label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.errors.title && (
            <p className="text-red-500 text-sm">{formik.errors.title}</p>
          )}
        </div>

        {/* Hourly Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
          <input
            type="number"
            name="hourlyRate"
            value={formik.values.hourlyRate}
            onChange={formik.handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.errors.hourlyRate && (
            <p className="text-red-500 text-sm">{formik.errors.hourlyRate}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.errors.country && (
            <p className="text-red-500 text-sm">{formik.errors.country}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default DeveloperRegister;