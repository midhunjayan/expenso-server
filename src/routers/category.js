const express = require('express');
// middleware
const auth = require('../middleware/auth');
// models
const Category = require('../models/category');
// other configs
const router = new express.Router();

router.post('/category', auth, async (req, res) => {
  const category = new Category({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await category.save();
    res.status(201).send({ category });
  } catch (e) {
    res.status(400).send(e);
  }
});

// 1 - incoming, 2 - outgoing
router.get('/categories/:type', auth, async (req, res) => {
  const categoryType = +(req.params.type);
  try {
    await req.user.populate('category').execPopulate();
    const response = req.user.category.filter((f) => f.categoryType === categoryType);
    res.send(response);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
