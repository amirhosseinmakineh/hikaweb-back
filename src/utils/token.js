import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateTokens(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
