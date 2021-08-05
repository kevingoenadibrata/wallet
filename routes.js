import * as express from "express";
import { deposit, withdraw } from "./controllers/transactions.js";
import {
  disableWallet,
  enableWallet,
  getWallet,
  initiateWallet,
} from "./controllers/wallets.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import {
  disableValidator,
  initValidator,
  transactionValidator,
} from "./middleware/validators.js";

export const router = express.Router();

router.route("/init").post(initValidator, initiateWallet);
router.route("/wallet").post(authMiddleware, enableWallet);
router.route("/wallet").get(authMiddleware, getWallet);
router.route("/wallet").patch(authMiddleware, disableValidator, disableWallet);
router
  .route("/wallet/deposits")
  .post(authMiddleware, transactionValidator, deposit);
router
  .route("/wallet/withdrawals")
  .post(authMiddleware, transactionValidator, withdraw);
