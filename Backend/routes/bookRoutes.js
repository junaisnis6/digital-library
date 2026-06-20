const express = require("express");
const multer = require("multer");
const path = require("path");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getBooks,
  getBookById,
  getMyBooks,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Public route
router.get("/", getBooks);

// Protected routes
router.get("/my-books", authMiddleware, getMyBooks);

router.post("/", authMiddleware, upload.single("image"), addBook);

router.get("/:id", getBookById);

router.put("/:id", authMiddleware, upload.single("image"), updateBook);

router.delete("/:id", authMiddleware, deleteBook);

module.exports = router;
