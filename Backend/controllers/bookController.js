const Book = require("../models/Book");

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("owner", "name email");

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user's books
const getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({
      owner: req.user.id,
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a book
const addBook = async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const book = await Book.create({
      title,
      author,
      genre,
      description,
      image,
      owner: req.user.id,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    if (book.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.genre = req.body.genre || book.genre;
    book.description = req.body.description || book.description;

    if (req.file) {
      book.image = `/uploads/${req.file.filename}`;
    }

    await book.save();

    res.json(book);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    if (book.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await book.deleteOne();

    res.json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//Edit Book
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getBooks,
  getBookById,
  getMyBooks,
  addBook,
  updateBook,
  deleteBook,
};
