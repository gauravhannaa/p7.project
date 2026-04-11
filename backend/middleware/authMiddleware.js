import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = decoded;
      next();
    } catch (error) {
      console.error('Auth error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// ✅ YEH FUNCTION ADD KARO - ye missing tha
export const verifyAdmin = async (req, res) => {
  res.json({ valid: true, admin: req.admin });
};