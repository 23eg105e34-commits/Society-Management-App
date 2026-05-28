import { Schema, model }
from "mongoose";


const UserSchema = new Schema(

  {

    name: {

      type: String,

      required: [
        true,
        "Name is required"
      ]
    },


    email: {

      type: String,

      required: [
        true,
        "Email is required"
      ],

      unique: true
    },


    role: {

      type: String,

      enum: [
        "OWNER",
        "RESIDENT"
      ],

      default: "RESIDENT"
    },


    password: {

      type: String,

      required: [
        true,
        "Password is required"
      ]

    },


    // PROFILE IMAGE
    profilePic: {

      type: String,

      default: ""
    }

  },

  {
    timestamps: true
  }
);


export const UserModel =
  model(
    "User",
    UserSchema
  );