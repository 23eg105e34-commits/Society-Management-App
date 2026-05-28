import bcrypt from "bcryptjs";

import { UserModel }
from "../models/User.js";



// GET PROFILE
export const getProfile =
async (req, res, next) => {

  try {

    const user =
      await UserModel.findById(
        req.user.id
      ).select("-password");



    res.status(200).json(user);

  } catch (err) {

    next(err);
  }
};




// UPDATE PROFILE
export const updateProfile =
async (req, res, next) => {

  try {

    const {
      name,
      profilePic
    } = req.body;



    const updatedUser =
      await UserModel.findByIdAndUpdate(

        req.user.id,

        {
          name,
          profilePic
        },

        {
          new: true
        }

      ).select("-password");



    res.status(200).json({

      message:
        "Profile Updated",

      user: updatedUser
    });

  } catch (err) {

    next(err);
  }
};




// CHANGE PASSWORD
export const changePassword =
async (req, res, next) => {

  try {

    const {
      oldPassword,
      newPassword
    } = req.body;



    const user =
      await UserModel.findById(
        req.user.id
      );



    const isMatch =
      await bcrypt.compare(

        oldPassword,

        user.password
      );



    if (!isMatch) {

      return res.status(400).json({

        message:
          "Old password incorrect"
      });
    }



    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );



    user.password =
      hashedPassword;



    await user.save();



    res.status(200).json({

      message:
        "Password Changed Successfully"
    });

  } catch (err) {

    next(err);
  }
};