const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

// Define routes
router.get('/', announcementController.getAnnouncements);
router.post('/', announcementController.createAnnouncement);
router.get('/user/:userId', announcementController.getAnnouncementsByUser);
router.put('/:id', announcementController.updateAnnouncement);
router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router;