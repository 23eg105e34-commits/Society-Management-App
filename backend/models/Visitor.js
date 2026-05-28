import { Schema, model } from "mongoose";

const VisitorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },

    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"]
    },

    flatNumber: {
      type: String,
      required: [true, "Flat Number is required"]
    },

    entryTime: {
      type: Date,
      default: Date.now
    },

    exitTime: {
      type: Date
    },

    status: {
      type: String,
      enum: ["IN", "OUT"],
      default: "IN"
    }
  },
  { timestamps: true }
);

export const VisitorModel = model("Visitor", VisitorSchema);