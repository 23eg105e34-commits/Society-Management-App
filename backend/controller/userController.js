import { UserModel }
from "../models/User.js";


// GET ALL RESIDENTS
export const getResidents =
async (
  req,
  res,
  next
) => {

  try {

    const residents =
      await UserModel.find({

        role: "RESIDENT"
      }).select(

        "_id name email"
      );


    res.status(200).json(
      residents
    );

  } catch (err) {

    next(err);
  }
};