import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


async function protect(req, res, next) {
  let token;

  if (req.headers.authorization?.startsWith('JWT')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
};

export default protect;