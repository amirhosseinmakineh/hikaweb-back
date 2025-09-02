import { Router } from 'express';
import { body } from 'express-validator';
import { createComment, getComments } from './comment.controller.js';
import validate from '../../middleware/validate.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Manage comments
 */

/**
 * @swagger
 * /api/v1/comments:
 *   post:
 *     tags: [Comments]
 *     summary: Create a comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - text
 *             properties:
 *               fullName:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *               text:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               status:
 *                 type: string
 *                 enum: [active, inactive, archived]
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  '/',
  body('fullName').notEmpty(),
  body('text').notEmpty(),
  body('rating').optional().isInt({ min: 1, max: 5 }),
  validate,
  createComment
);

/**
 * @swagger
 * /api/v1/comments:
 *   get:
 *     tags: [Comments]
 *     summary: List comments
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get('/', getComments);

export default router;

