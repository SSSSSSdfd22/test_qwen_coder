import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String },
  description: { type: String }
});

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  year: { type: String }
});

const aboutSchema = new mongoose.Schema({
  bio: { type: String },
  profileImage: { type: String },
  experiences: [experienceSchema],
  educations: [educationSchema],
  skills: [{ type: String }],
  contactDetails: {
    email: { type: String },
    phone: { type: String },
    location: { type: String }
  }
}, { timestamps: true });

export default mongoose.model('About', aboutSchema);
