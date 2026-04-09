import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDefaultAdmin = async () => {
  const adminExists = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
  if (!adminExists) {
    await Admin.create({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });
    console.log('Default admin created');
  }
};