import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  roles: { type: [String], default: ['user'] },
  status: { type: String, enum: ['active', 'inactive', 'archived'], default: 'active' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
