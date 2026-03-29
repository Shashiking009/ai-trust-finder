import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: Date },
  status: { type: String, enum: ['Pending', 'Verified', 'Suspicious'], default: 'Pending' },
  documentUrl: { type: String },
  extractedText: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Certificate', certificateSchema);
