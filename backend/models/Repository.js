import mongoose from 'mongoose';

const repositorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  language: { type: String },
  stars: { type: Number, default: 0 },
  forks: { type: Number, default: 0 },
  updated: { type: String },
  url: { type: String },
}, { timestamps: true });

export default mongoose.model('Repository', repositorySchema);