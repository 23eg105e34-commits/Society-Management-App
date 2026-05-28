import express from "express";

import {

  addNotice,

  getNotices,

  deleteNotice,

  markNotificationsRead

} from "../controller/noticeController.js";


import {

  authMiddleware

} from "../middleware/authMiddleware.js";


import {

  ownerOnly

} from "../middleware/roleMiddleware.js";


const router =
  express.Router();



// OWNER ONLY
router.post(

  "/",

  authMiddleware,

  ownerOnly,

  addNotice
);



// ALL LOGGED USERS
router.get(

  "/",

  authMiddleware,

  getNotices
);



// MARK NOTIFICATIONS READ
router.put(

  "/read",

  authMiddleware,

  markNotificationsRead
);



// OWNER ONLY
router.delete(

  "/:id",

  authMiddleware,

  ownerOnly,

  deleteNotice
);


export default router;