import express from "express";
import {

  createPayment,
  getPayments,
  payPayment

} from "../controller/paymentController.js";

import {

  authMiddleware

} from "../middleware/authMiddleware.js";

import {

  ownerOnly,
  residentOnly

} from "../middleware/roleMiddleware.js";


const router = express.Router();


// OWNER CREATES MAINTENANCE BILL
router.post("/", authMiddleware, ownerOnly, createPayment);
// ALL LOGGED USERS CAN VIEW
router.get( "/", authMiddleware,getPayments);


// RESIDENT PAYS BILL
router.put("/:id/pay",authMiddleware, residentOnly,payPayment);
export default router;