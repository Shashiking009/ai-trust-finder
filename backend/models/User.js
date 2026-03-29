import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  verified: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  education: { type: String },
  skills: [skillSchema],
  interests: [{ type: String }],
  careerGoal: { type: String },
  experience: { type: String },
  projects: [{
    title: { type: String },
    description: { type: String },
    url: { type: String }
  }],
  trustScore: { type: Number, default: 0 },
  trustScoreFactors: {
    verifiedSkillsBase: { type: Number, default: 0 },
    profileCompleteness: { type: Number, default: 0 },
    platformActivity: { type: Number, default: 0 },
    peerFeedback: { type: Number, default: 0 }
  },
  needs: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
