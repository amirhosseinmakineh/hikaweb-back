import { Router } from 'express';
import commentRoutes from '../../modules/comments/comment.routes.js';

const router = Router();

router.use('/comments', commentRoutes);

export default router;

