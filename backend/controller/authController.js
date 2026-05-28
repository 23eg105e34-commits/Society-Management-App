import { UserModel } from "../models/User.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";



// REGISTER USER
export const Register = async (
  req,
  res,
  next
) => {

  try {

    const {
      name,
      email,
      password,
      role
    } = req.body;


    // check whether user exists
    const userExists =
      await UserModel.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message: "User Already Exists"
      });
    }


    // hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);


    // create user
    const createUser =
      await UserModel.create({

        name,

        email,

        password: hashedPassword,

        role
      });


    res.status(201).json({
      message:
        "User Registered Successfully",

      user: createUser
    });

  } catch (err) {

    next(err);
  }
};




// LOGIN USER
export const Login = async (
  req,
  res,
  next
) => {

  try {

    const {
      email,
      password
    } = req.body;


    // check user
    const user =
      await UserModel.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid User"
      });
    }


    // check password
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password"
      });
    }


    // generate token
    const token = jwt.sign(

      {
        userId: user._id,

        role: user.role
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d"
      }
    );


    // remove password
    const {
      password: _,
      ...userData
    } = user._doc;


    res.status(200).json({

      message: "Login Successful",

      token,

      user: userData
    });

  } catch (err) {

    next(err);
  }
};