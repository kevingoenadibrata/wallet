import jwt from "jsonwebtoken";
import { SECRET } from "../constants/secret.js";
import { getWalletById } from "../database.js";

export const authMiddleware = async (req, res, next) => {
  try {
    var token = req.headers.authorization.split("Bearer ")[1];
    const decoded = jwt.verify(token, SECRET);
    req.headers.wid = decoded.id || "";

    const walletData = await getWalletById(req.headers.wid);

    if (walletData.length === 0) {
      throw new Error("Authentication fails");
    }

    next();
  } catch (e) {
    next(e);
  }
};
