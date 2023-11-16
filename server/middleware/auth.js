import jwt from "jsonwebtoken";
import { pool } from "../config/database.js";

const middlewareAuthentication = async (req, res, next) => {
  try {
    const token = req.cookies.kulb;
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    try {
      const results = await pool.query(
        `SELECT * FROM users WHERE users.email = $1`,
        [decoded.email]
      );
      if (results.rows.length < 1) {
        return res.status(401).send("Invalid Token");
      }
    } catch (err) {
      return res.status(400).send(err.message);
    }

    next();
  } catch (err) {
    return res.status(401).send("Invalid Token " + err.message);
  }
};

export default middlewareAuthentication;
