import { Schema, model }
from "mongoose";


const NoticeSchema =
new Schema(

  {

    title: {

      type: String,

      required: true
    },


    description: {

      type: String,

      required: true
    },


    // UNREAD / READ STATUS
    isRead: {

      type: Boolean,

      default: false
    }

  },

  {
    timestamps: true
  }
);


export const NoticeModel =
  model(
    "Notice",
    NoticeSchema
);