import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  duration: { type: String, trim: true },
  description: { type: String, trim: true }
});

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true, trim: true },
  degree: { type: String, required: true, trim: true },
  year: { type: String, trim: true }
});

const aboutSchema = new mongoose.Schema(
  {
    bio: { type: String, trim: true },
    profileImage: { type: String },
    experiences: [experienceSchema],
    educations: [educationSchema],
    skills: [{ type: String, trim: true }],
    contactDetails: {
      email: { type: String, trim: true, lowercase: true },
      phone: { type: String, trim: true },
      location: { type: String, trim: true }
    }
  },
  { timestamps: true }
);

export default mongoose.model('About', aboutSchema);
