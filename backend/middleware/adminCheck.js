// backend/middleware/adminCheck.js
export default function adminCheck(req, res, next) {
  const adminKey = req.headers["x-admin-key"]; // check header
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(403).json({ message: "Forbidden: Admin only" });
  }
  next();
}