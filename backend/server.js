import exp from "express";

import { connect } from "mongoose";

import { config } from "dotenv";

import cors from "cors";

import http from "http";

import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import visitorRoutes from "./routes/visitorRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";


// LOAD ENV VARIABLES
config();


// CREATE EXPRESS APP
const app = exp();


// CREATE HTTP SERVER
const server = http.createServer(app);


// FRONTEND URL
const FRONTEND_URL =
  "https://society-management-app-ten.vercel.app";


// SOCKET.IO SERVER
export const io = new Server(server, {

  cors: {

    origin: FRONTEND_URL,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ],

    credentials: true
  }
});


// SOCKET CONNECTION
io.on("connection", (socket) => {

  console.log(
    "User Connected:",
    socket.id
  );

  socket.on("disconnect", () => {

    console.log(
      "User Disconnected"
    );
  });
});


// MIDDLEWARE
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true
  })
);

app.use(exp.json());


// TEST ROUTE
app.get("/", (req, res) => {

  res.send(
    "Society Management API Running"
  );
});


// ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/facilities",
  facilityRoutes
);

app.use(
  "/api/visitors",
  visitorRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use(
  "/api/notices",
  noticeRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/complaints",
  complaintRoutes
);

app.use(
  "/api/profile",
  profileRoutes
);


// CONNECT DB & START SERVER
const connectDB = async () => {

  try {

    await connect(
      process.env.DB_URL
    );

    console.log(
      "DB connection Success"
    );

    server.listen(
      process.env.PORT || 4000,

      () => {

        console.log(
          `Server started on port ${
            process.env.PORT || 4000
          }`
        );
      }
    );

  } catch (err) {

    console.log(
      "Error in connecting DB",
      err
    );
  }
};

connectDB();


// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {

  console.log(
    "Error Name:",
    err.name
  );

  console.log(
    "Error Code:",
    err.code
  );

  console.log(
    "Error:",
    err
  );


  // VALIDATION ERROR
  if (
    err.name === "ValidationError"
  ) {

    return res.status(400).json({

      message:
        "Validation Error",

      error:
        err.message
    });
  }


  // CAST ERROR
  if (
    err.name === "CastError"
  ) {

    return res.status(400).json({

      message:
        "Invalid ID",

      error:
        err.message
    });
  }


  // DUPLICATE KEY ERROR
  const errCode =

    err.code ??

    err.cause?.code ??

    err.errorResponse?.code;


  const keyValue =

    err.keyValue ??

    err.cause?.keyValue ??

    err.errorResponse?.keyValue;


  if (
    errCode === 11000
  ) {

    const field =
      Object.keys(
        keyValue
      )[0];


    const value =
      keyValue[field];


    return res.status(409).json({

      message:
        "Duplicate value error",

      error:
        `${field} "${value}" already exists`
    });
  }


  // CUSTOM ERRORS
  if (err.status) {

    return res.status(
      err.status
    ).json({

      message:
        "Error occurred",

      error:
        err.message
    });
  }


  // DEFAULT SERVER ERROR
  res.status(500).json({

    message:
      "Server side error",

    error:
      "Internal Server Error"
  });
});