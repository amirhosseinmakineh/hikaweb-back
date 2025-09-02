import { Router } from 'express';
import { body } from 'express-validator';
import { requestOtp, verifyOtp, me } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/auth/otp/request:
 *   post:
 *     summary: Request OTP code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent
 */
router.post('/otp/request', [body('phone').isMobilePhone('fa-IR')], requestOtp);

/**
 * @swagger
 * /api/v1/auth/otp/verify:
 *   post:
 *     summary: Verify OTP and login
 *     tags: [Auth]
 */
router.post('/otp/verify', [
  body('phone').isMobilePhone('fa-IR'),
  body('code').isLength({ min: 6, max: 6 })
], verifyOtp);

router.get('/me', authenticate, me);

export default router;
