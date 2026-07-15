const Book = require("../models/Book");
const Request = require("../models/Request");

const getDashboard = async (req, res) => {
  try {
    // Logged-in user's books
    const myBooks = await Book.find({
      owner: req.user.id,
    }).sort({ createdAt: -1 });

    // Requests received
    const requests = await Request.find({
      owner: req.user.id,
    })
      .populate("book")
      .populate("requester", "name email")
      .sort({ createdAt: -1 });

    const dashboard = {
      stats: {
        myBooks: myBooks.length,

        available: myBooks.filter((b) => b.status === "Available").length,

        borrowed: myBooks.filter((b) => b.status === "Borrowed").length,

        requests: requests.length,
      },

      recentBooks: myBooks.slice(0, 5),

      recentRequests: requests.slice(0, 5),
    };

    res.json(dashboard);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};
