import { verifyAccessToken } from '../utils/token.js';

export function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function authorize(roles = []) {
  return (req, res, next) => {
    if (!roles.length || roles.some(role => req.user?.roles?.includes(role))) {
      return next();
    }
    return res.status(403).json({ message: 'Forbidden' });
  };
}
