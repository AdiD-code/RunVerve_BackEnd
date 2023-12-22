const express = require('express');
const jwt = require('jsonwebtoken');
const Adoption = require('../models/Adoption');
const Tree = require('../models/Tree');

const router = express.Router();

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: 'Forbidden' });
  }
};

router.get('/trees', authenticateToken, async (req, res) => {
  try {
    // Retrieve adopted trees for the authenticated user
    const adoptedTreeIds = await Adoption.find({ userId: req.user.id }).distinct('treeId');
    const adoptedTrees = await Tree.find({ _id: { $in: adoptedTreeIds } });

    res.json({ adoptedTrees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
