import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import visitorRoutes from "./routes/visitorRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

// =======================
// LOAD ENV VARIABLES
// =======================

config();

// =======================
// CREATE APP
// =======================

const app = exp();

// =======================
// CORS CONFIG
// =======================
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://society-management-app-ten.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Handle preflight requests — use the SAME options
app.options("*", cors(corsOptions));

// Handle preflight requests
app.options("*", cors());

// =======================
// BODY PARSER
// =======================

app.use(exp.json());

// =======================
// TEST ROUTE
// =======================

app.get("/", (req, res) => {
  res.send("Society Management API Running");
});

// =======================
// ROUTES
// =======================

app.use("/api/auth", authRoutes);

app.use("/api/facilities", facilityRoutes);

app.use("/api/visitors", visitorRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/notices", noticeRoutes);

app.use("/api/users", userRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/complaints", complaintRoutes);

app.use("/api/profile", profileRoutes);

// =======================
// DATABASE CONNECTION
// =======================

const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);

    console.log("✅ DB Connection Success");

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log("❌ Error connecting DB");
    console.log(err);
  }
};

connectDB();

// =======================
// ERROR HANDLER
// =======================

app.use((err, req, res, next) => {
  console.log("Error Name:", err.name);
  console.log("Error Code:", err.code);
  console.log("Error:", err);

  // Validation Error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation Error",
      error: err.message,
    });
  }

  // Cast Error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID",
      error: err.message,
    });
  }

  // Duplicate Key Error
  const errCode =
    err.code ??
    err.cause?.code ??
    err.errorResponse?.code;

  const keyValue =
    err.keyValue ??
    err.cause?.keyValue ??
    err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];

    return res.status(409).json({
      message: "Duplicate value error",
      error: `${field} "${value}" already exists`,
    });
  }

  // Custom Errors
  if (err.status) {
    return res.status(err.status).json({
      message: "Error occurred",
      error: err.message,
    });
  }

  // Default Error
  return res.status(500).json({
    message: "Server side error",
    error: err.message || "Internal Server Error",
  });
});