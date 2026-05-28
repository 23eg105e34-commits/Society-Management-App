export const ownerOnly = (
  req,
  res,
  next
) => {

  try {

    if (
      req.user.role !== "OWNER"
    ) {

      return res.status(403).json({

        message:
          "Access Denied. OWNER only."
      });
    }

    next();

  } catch (err) {

    res.status(500).json({

      message:
        "Role authorization failed"
    });
  }
};




export const residentOnly = (
  req,
  res,
  next
) => {

  try {

    if (
      req.user.role !== "RESIDENT"
    ) {

      return res.status(403).json({

        message:
          "Access Denied. RESIDENT only."
      });
    }

    next();

  } catch (err) {

    res.status(500).json({

      message:
        "Role authorization failed"
    });
  }
};