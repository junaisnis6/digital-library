const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createRequest,
  getOwnerRequests,
  acceptRequest,
  rejectRequest,
} = require("../controllers/requestController");

router.post("/", authMiddleware, createRequest);

router.get("/", authMiddleware, getOwnerRequests);

router.put("/accept/:id", authMiddleware, acceptRequest);

router.put("/reject/:id", authMiddleware, rejectRequest);

module.exports = router;
