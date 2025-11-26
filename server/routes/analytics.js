const express = require('express');
const {
  getDashboard,
  getStreaks,
  getProgress,
  exportData
} = require('../controllers/analytics');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes are protected

router.get('/dashboard', getDashboard);
router.get('/streaks', getStreaks);
router.get('/progress', getProgress);
router.post('/export', exportData);

module.exports = router;