

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import { addUser, updateUser } from '../redux/features/userSlice';
import { v4 as uuidv4 } from 'uuid';
import { Save, CheckCircle, X, UserPlus, Edit, AlertCircle } from 'lucide-react';




// --- Validation Schema ---
const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  username: yup.string().required('Username is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .min(18, 'You must be at least 18 years old')
    .required('Age is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  country: yup.string().required('Please select a country'),
  gender: yup.string().nullable().required('Please select a gender'),
  skills: yup.array().min(1, 'Select at least one skill').required(),
  
  // UPDATED VALIDATION HERE
  dob: yup.string()
    .required('Date of Birth is required')
    .test('dob-match-age', 'Date of Birth year does not match the Age', function (value) {
      const { age } = this.parent;
      if (!age || !value) return true; // Skip if age or dob is missing (handled by required)

      const dobYear = new Date(value).getFullYear();
      const currentYear = new Date().getFullYear();
      const yearDiff = currentYear - dobYear;

      // Logic: If Age is 18 and Year is 2025, born in 2007 (Diff=18) or 2006 (Diff=19)
      // This allows a 1-year buffer for whether the birthday has passed or not.
      return yearDiff === age || yearDiff === age + 1;
    }),

  about: yup.string().required('Tell us a little about yourself'),
});

// --- Helper Component for Layout ---
const InputGroup = ({ label, error, children }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    {children}
    {error && (
      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
        <AlertCircle size={12} /> {error.message}
      </p>
    )}
  </div>
);

export default function UserForm({ editingUser, setEditingUser }) {
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      skills: [],
      gender: '', 
      country: ''
    }
  });

  // Watch all fields for real-time preview
  const watchedValues = watch();

  // Populate form when editingUser changes
  useEffect(() => {
    if (editingUser) {
      reset(editingUser);
    } else {
      reset({
        fullName: '',
        username: '',
        age: '',
        email: '',
        password: '',
        country: '',
        gender: '',
        skills: [],
        dob: '',
        about: '',
      });
    }
  }, [editingUser, reset]);

  const onSubmit = (data) => {
    if (editingUser) {
      dispatch(updateUser({ ...data, id: editingUser.id }));
      setEditingUser(null);
    } else {
      dispatch(addUser({ ...data, id: uuidv4() }));
    }
    reset();
  };

  const cancelEdit = () => {
    setEditingUser(null);
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          {editingUser ? <Edit className="text-indigo-600" /> : <UserPlus className="text-indigo-600" />}
          {editingUser ? 'Edit User' : 'Register New User'}
        </h2>
        {editingUser && (
          <button onClick={cancelEdit} className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1">
            <X size={16} /> Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {/* Row 1: Name & Username */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup label="Full Name" error={errors.fullName}>
            <input {...register('fullName')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition" placeholder="John Doe" />
          </InputGroup>

          <InputGroup label="Username" error={errors.username}>
            <input {...register('username')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition" placeholder="johnd" />
          </InputGroup>
        </div>

        {/* Row 2: Email & Age */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup label="Email Address" error={errors.email}>
            <input type="email" {...register('email')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition" placeholder="john@example.com" />
          </InputGroup>

          <InputGroup label="Age" error={errors.age}>
            <input type="number" {...register('age')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition" placeholder="25" />
          </InputGroup>
        </div>

        {/* Row 3: DOB & Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <InputGroup label="Date of Birth" error={errors.dob}>
            <input type="date" {...register('dob')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition" />
          </InputGroup>

          <InputGroup label="Password" error={errors.password}>
            <input type="password" {...register('password')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition" placeholder="******" />
          </InputGroup>
        </div>

        {/* Row 4: Country & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup label="Country" error={errors.country}>
            <select {...register('country')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none bg-white">
              <option value="">Select Country</option>
              {['Nepal', 'Finland', 'Australia', 'USA', 'Canada'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </InputGroup>

          <InputGroup label="Gender" error={errors.gender}>
            <div className="flex gap-4 mt-2">
              {['Male', 'Female', 'Other'].map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={g}
                    {...register('gender')}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">{g}</span>
                </label>
              ))}
            </div>
          </InputGroup>
        </div>

        {/* Row 5: Skills */}
        <InputGroup label="Skills (Select at least one)" error={errors.skills}>
          <div className="flex flex-wrap gap-4 mt-2 bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300">
            {['JavaScript', 'React', 'Node.js', 'Python'].map((skill) => (
              <label key={skill} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition">
                <input
                  type="checkbox"
                  value={skill}
                  {...register('skills')}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">{skill}</span>
              </label>
            ))}
          </div>
        </InputGroup>

        {/* Row 6: About */}
        <InputGroup label="About Me" error={errors.about}>
          <textarea {...register('about')} rows="3" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition" placeholder="I am a developer..." />
        </InputGroup>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white font-bold shadow-md transition-all flex items-center justify-center gap-2
            ${editingUser 
              ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600' 
              : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
            }`}
        >
          {editingUser ? <Save size={20} /> : <CheckCircle size={20} />}
          {editingUser ? 'Update User Details' : 'Submit User Details'}
        </button>
      </form>

      {/* Real-time Preview Section */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Live Form Preview</h3>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto shadow-inner">
          <pre>{JSON.stringify(watchedValues, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}