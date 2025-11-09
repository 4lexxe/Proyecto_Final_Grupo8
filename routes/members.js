const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// GET /api/members - devuelve todos los miembros
router.get('/', async (req, res) => {
  try {
    const members = await Member.find({}).lean();
    res.json({ success: true, members });
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ success: false, message: 'Error al obtener miembros' });
  }
});

module.exports = router;
