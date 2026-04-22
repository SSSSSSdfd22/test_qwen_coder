import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String },
  image: { type: String },
  education: [{
    institution: { type: String },
    degree: { type: String },
    year: { type: String }
  }],
  experience: [{
    company: { type: String },
    role: { type: String },
    duration: { type: String },
    description: { type: String }
  }],
  skills: [{ type: String }],
  contact: {
    email: { type: String },
    phone: { type: String },
    linkedin: { type: String },
    github: { type: String },
    website: { type: String }
  }
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
