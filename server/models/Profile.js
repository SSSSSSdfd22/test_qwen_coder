import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    bio: { type: String, trim: true },
    image: { type: String },
    education: [
      {
        institution: { type: String, trim: true },
        degree: { type: String, trim: true },
        year: { type: String }
      }
    ],
    experience: [
      {
        company: { type: String, trim: true },
        role: { type: String, trim: true },
        duration: { type: String },
        description: { type: String }
      }
    ],
    skills: [{ type: String, trim: true }],
    contact: {
      email: { type: String, trim: true, lowercase: true },
      phone: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true },
      website: { type: String, trim: true }
    }
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
