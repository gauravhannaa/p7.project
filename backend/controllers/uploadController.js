import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import Profile from '../models/Profile.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage (no disk writing)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Upload buffer to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'portfolio_profiles' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    const imageUrl = result.secure_url;
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();
    profile.profileImage = imageUrl;
    await profile.save();
    res.json({ imageUrl, message: 'Profile picture updated' });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: error.message });
  }
};