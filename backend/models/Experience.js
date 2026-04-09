import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  isCurrent: { type: Boolean, default: false },
  responsibilities: [{ type: String }],
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);