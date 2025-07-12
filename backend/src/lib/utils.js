import jwt from "jsonwebtoken";

export const generateToken = (user, res) => {
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role, // Include role here
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
