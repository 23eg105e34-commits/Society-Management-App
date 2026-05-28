import express from "express";

import {
  getResidents
} from "../controller/userController.js";

import {
  authMiddleware
} from "../middleware/authMiddleware.js";

import {
  ownerOnly
} from "../middleware/roleMiddleware.js";


const router =
  express.Router();


// OWNER ONLY
router.get(

  "/residents",

  authMiddleware,

  ownerOnly,

  getResidents
);


export default router;