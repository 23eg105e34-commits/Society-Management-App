import express from "express";

import {

  addComplaint,

  getComplaints,

  updateComplaintStatus

} from "../controller/complaintController.js";

import {

  authMiddleware

} from "../middleware/authMiddleware.js";

import {

  ownerOnly

} from "../middleware/roleMiddleware.js";


const router =
  express.Router();




// ADD COMPLAINT
router.post(

  "/",

  authMiddleware,

  addComplaint
);




// GET COMPLAINTS
router.get(

  "/",

  authMiddleware,

  getComplaints
);




// UPDATE STATUS
router.put(

  "/:id",

  authMiddleware,

  ownerOnly,

  updateComplaintStatus
);




export default router;