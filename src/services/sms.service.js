import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export async function sendSMS(to, message) {
  const apiKey = process.env.KAVENEGAR_API_KEY;
  if (!apiKey) {
    console.warn('Kavenegar API key not configured');
    return;
  }
  const url = `https://api.kavenegar.com/v1/${apiKey}/sms/send.json?receptor=${to}&message=${encodeURIComponent(message)}`;
  try {
    await fetch(url);
  } catch (err) {
    console.error('SMS sending failed', err);
  }
}
