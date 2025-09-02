import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    thumbnail: { type: String },
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Comment', commentSchema);

