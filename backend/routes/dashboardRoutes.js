import express from "express";

import {

  getDashboardStats

} from "../controller/dashboardController.js";


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

  "/stats",

  authMiddleware,

  ownerOnly,

  getDashboardStats
);


export default router;