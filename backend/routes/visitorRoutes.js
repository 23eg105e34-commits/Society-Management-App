import express from "express";

import {
  addVisitor,
  getVisitors,
  markVisitor
} from "../controller/visitorController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

// Add Visitor
router.post("/", authMiddleware, addVisitor);

// Get Visitors
router.get("/", authMiddleware, getVisitors);

// Mark Visitor Exit
router.put("/:id/exit", authMiddleware, markVisitor);

export default router;