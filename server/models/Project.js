import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    techStack: [{ type: String, trim: true }],
    thumbnail: { type: String },
    liveDemo: { type: String, trim: true },
    github: { type: String, trim: true },
    category: { type: String, default: 'General', trim: true }
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
