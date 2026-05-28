import express from "express";

import {

  bookFacility,

  getAllBookings,

  approveBooking,

  rejectBooking

} from "../controller/facilityController.js";


import {

  authMiddleware

} from "../middleware/authMiddleware.js";


import {

  ownerOnly,

  residentOnly

} from "../middleware/roleMiddleware.js";


const router =
  express.Router();



// RESIDENT REQUESTS FACILITY
router.post(

  "/",

  authMiddleware,

  residentOnly,

  bookFacility
);



// ALL USERS VIEW BOOKINGS
router.get(

  "/",

  authMiddleware,

  getAllBookings
);



// OWNER APPROVES BOOKING
router.put(

  "/:id/approve",

  authMiddleware,

  ownerOnly,

  approveBooking
);



// OWNER REJECTS BOOKING
router.put(

  "/:id/reject",

  authMiddleware,

  ownerOnly,

  rejectBooking
);


export default router;