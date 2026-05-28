import jwt from "jsonwebtoken";

export const authMiddleware = (
  req,
  res,
  next
) => {

  try {

    // get authorization header
    const authHeader =
      req.headers.authorization;

    // check token exists
    if (!authHeader) {

      return res.status(401).json({
        message: "No token provided"
      });
    }

    // remove Bearer
    const token =
      authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // attach user
    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      message: "Invalid token"
    });
  }
};