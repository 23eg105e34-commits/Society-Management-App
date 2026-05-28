import { UserModel }
from "../models/User.js";

import { PaymentModel }
from "../models/Payment.js";

import { FacilityModel }
from "../models/Facility.js";

import { VisitorModel }
from "../models/Visitor.js";


// GET DASHBOARD STATS
export const getDashboardStats =
async (
  req,
  res,
  next
) => {

  try {

    // TOTAL RESIDENTS
    const totalResidents =
      await UserModel.countDocuments({

        role: "RESIDENT"
      });



    // PENDING PAYMENTS
    const pendingPayments =
      await PaymentModel.countDocuments({

        status: "PENDING"
      });



    // PAID PAYMENTS
    const paidPayments =
      await PaymentModel.countDocuments({

        status: "PAID"
      });



    // PENDING FACILITIES
    const pendingFacilities =
      await FacilityModel.countDocuments({

        status: "PENDING"
      });



    // TOTAL VISITORS
    const totalVisitors =
      await VisitorModel.countDocuments();



    res.status(200).json({

      totalResidents,

      pendingPayments,

      paidPayments,

      pendingFacilities,

      totalVisitors
    });

  } catch (err) {

    next(err);
  }
};