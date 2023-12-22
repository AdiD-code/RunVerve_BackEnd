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

router.post('/adopt/:treeId', authenticateToken, async (req, res) => {
  try {
    const treeId = req.params.treeId;

    // Check if the tree exists
    const tree = await Tree.findById(treeId);
    if (!tree) {
      return res.status(404).json({ message: 'Tree not found' });
    }

    // Check if the user already adopted the tree
    const existingAdoption = await Adoption.findOne({
      userId: req.user.id,
      treeId: treeId,
    });

    if (existingAdoption) {
      return res.status(400).json({ message: 'You already adopted this tree' });
    }

    // Save adoption record
    const newAdoption = await Adoption.create({
      userId: req.user.id,
      treeId: treeId,
    });

    res.json({ message: 'Tree adopted successfully', adoption: newAdoption });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
