import Comment from './comment.model.js';

export const createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const query = {};
    const comments = await Comment.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

    const total = await Comment.countDocuments(query);
    res.json({ data: comments, page: Number(page), total });
  } catch (err) {
    next(err);
  }
};

