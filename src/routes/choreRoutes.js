const express = require('express');
const router = express.Router();
const choreController = require('../controllers/choreController');

router.post('/', choreController.createChore);
router.patch('/:id/complete', choreController.markAsDone);
router.patch('/:id/verify', choreController.verifyChore);

module.exports = router;