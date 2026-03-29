import User from '../models/User.js';

export const calculateTrustScore = (user) => {
  const w1 = 0.50, w2 = 0.20, w3 = 0.15, w4 = 0.15;
  const factors = user.trustScoreFactors || {
    verifiedSkillsBase: 0,
    profileCompleteness: 0,
    platformActivity: 0,
    peerFeedback: 0
  };

  const score = 
    (w1 * factors.verifiedSkillsBase) +
    (w2 * factors.profileCompleteness) +
    (w3 * factors.platformActivity) +
    (w4 * factors.peerFeedback);
    
  return Math.min(Math.round(score), 1000);
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.education = req.body.education || user.education;
    user.interests = req.body.interests || user.interests;
    user.careerGoal = req.body.careerGoal || user.careerGoal;
    user.experience = req.body.experience || user.experience;
    user.needs = req.body.needs || user.needs;
    
    let completeness = 0;
    if (user.education) completeness += 40;
    if (user.experience) completeness += 40;
    if (user.interests && user.interests.length > 0) completeness += 40;
    if (user.careerGoal) completeness += 40;
    if (user.needs && user.needs.length > 0) completeness += 40;
    
    user.trustScoreFactors.profileCompleteness = completeness;
    user.trustScore = calculateTrustScore(user);

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const addSkill = async (req, res) => {
  try {
    const { name, level } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    try {
      const aiRes = await fetch('http://localhost:8000/api/v1/analyze-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skill: name })
      });
      const aiData = await aiRes.json();
      
      user.skills.push({
        name: aiData.normalized_skill || name,
        level: level || 'Beginner',
        verified: false
      });
    } catch(err) {
      user.skills.push({ name, level, verified: false });
    }

    user.trustScoreFactors.platformActivity += 10;
    user.trustScore = calculateTrustScore(user);

    await user.save();
    res.json(user.skills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ trustScore: -1 }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
