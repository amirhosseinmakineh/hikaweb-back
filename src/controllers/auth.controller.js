import crypto from 'crypto';
import User from '../models/User.js';
import { generateTokens } from '../utils/token.js';
import { sendSMS } from '../services/sms.service.js';
import { validationResult } from 'express-validator';
import client, { connectRedis } from '../config/redis.js';

const OTP_EXPIRY = 5 * 60; // 5 minutes

export async function requestOtp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { phone } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString();
  await connectRedis();
  await client.set(`otp:${phone}`, otp, { EX: OTP_EXPIRY });
  await sendSMS(phone, `Your verification code is ${otp}`);
  return res.json({ message: 'OTP sent' });
}

export async function verifyOtp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { phone, code } = req.body;
  await connectRedis();
  const stored = await client.get(`otp:${phone}`);
  if (stored !== code) {
    return res.status(400).json({ message: 'Invalid code' });
  }
  await client.del(`otp:${phone}`);
  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({ phone });
  }
  const tokens = generateTokens({ id: user._id, roles: user.roles });
  return res.json({ user, ...tokens });
}

export async function me(req, res) {
  const user = await User.findById(req.user.id).select('-password');
  return res.json({ user });
}
