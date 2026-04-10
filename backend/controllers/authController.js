import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// Login handler
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    const admin = await Admin.findOne({ username });

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Ensure JWT_SECRET is set
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET not set in environment');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const token = jwt.sign({ id: admin._id }, jwtSecret, { expiresIn: '7d' });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create default admin with fallback values
export const createDefaultAdmin = async () => {
  try {
    const defaultUsername = process.env.ADMIN_USERNAME || 'gauravhanna';
    const defaultPassword = process.env.ADMIN_PASSWORD || 'hanna!';

    // Check if admin already exists
    const adminExists = await Admin.findOne({ username: defaultUsername });
    if (!adminExists) {
      await Admin.create({
        username: defaultUsername,
        password: defaultPassword,
      });
      console.log(`✅ Default admin created: ${defaultUsername}`);
    } else {
      console.log('ℹ️ Admin already exists, skipping creation');
    }
  } catch (error) {
    console.error('❌ Admin creation error:', error);
  }
};