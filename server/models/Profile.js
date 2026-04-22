import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  jobTitle: { type: String, required: true },
  tagline: { type: String },
  photo: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  linkedin: { type: String },
  github: { type: String },
  website: { type: String }
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
