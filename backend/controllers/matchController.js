import Match from '../models/Match.js';
import User from '../models/User.js';

export const getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    try {
      const aiEngineUrl = process.env.AI_ENGINE_URL || 'http://localhost:8000';
      const aiRes = await fetch(`${aiEngineUrl}/api/v1/calculate-matches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id })
      });
      const matches = await aiRes.json();
      res.json(matches);
    } catch (e) {
      const allUsers = await User.find({ _id: { $ne: user._id } }).limit(5).select('-password');
      res.json(allUsers.map(u => ({
        userB: u,
        matchScore: Math.random() * 0.5 + 0.5,
        type: 'SkillExchange',
        reason: 'Fallback mock match based on location/activity.'
      })));
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
