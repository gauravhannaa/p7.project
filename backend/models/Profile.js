import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Gaurav Tiwari' },
  username: { type: String, default: 'gauravhanna' },
  title: { type: String, default: 'Customer & Technical Support Engineer' },
  bio: { type: String, default: '' },
  location: { type: String, default: 'Gurgaon, India' },
  email: { type: String, default: 'gauravhanna2003@gmail.com' },
  phone: { type: String, default: '+91 9664609473' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  instagram: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);