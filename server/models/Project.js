import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  thumbnail: { type: String },
  liveDemo: { type: String },
  github: { type: String },
  category: { type: String, default: 'General' }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
