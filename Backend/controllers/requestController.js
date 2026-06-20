const Request = require("../models/Request");
const Book = require("../models/Book");

// Create a borrow request
const createRequest = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    if (book.owner.toString() === req.user.id) {
      return res.status(400).json({
        message: "You cannot request your own book",
      });
    }

    if (book.status !== "Available") {
      return res.status(400).json({
        message: "Book is not available",
      });
    }

    const existing = await Request.findOne({
      book: bookId,
      requester: req.user.id,
      status: "Pending",
    });

    if (existing) {
      return res.status(400).json({
        message: "Request already exists",
      });
    }

    const request = await Request.create({
      book: book._id,
      requester: req.user.id,
      owner: book.owner,
    });

    book.status = "Requested";
    await book.save();

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// View requests received by owner
const getOwnerRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      owner: req.user.id,
    })
      .populate("book")
      .populate("requester", "name email");

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Accept request
const acceptRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    request.status = "Accepted";
    request.borrowUntil = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

    await request.save();

    await Book.findByIdAndUpdate(request.book, {
      status: "Borrowed",
    });

    res.json({
      message: "Request accepted",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Reject request
const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    request.status = "Rejected";
    await request.save();

    await Book.findByIdAndUpdate(request.book, {
      status: "Available",
    });

    res.json({
      message: "Request rejected",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRequest,
  getOwnerRequests,
  acceptRequest,
  rejectRequest,
};
