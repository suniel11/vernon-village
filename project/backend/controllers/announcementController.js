const Announcement = require("../models/Annoucement");

// Create a new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, description, status, user } = req.body;
    const newAnnouncement = new Announcement({ title, description, status, user });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().populate("user", "name");
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get announcements by user ID
exports.getAnnouncementsByUser = async (req, res) => {
  try {
    const announcements = await Announcement.find({ user: req.params.userId }).populate("user", "name");
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an announcement by ID
exports.updateAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an announcement by ID
exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json({ message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};