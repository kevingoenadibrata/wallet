import {
  createDeposit,
  createWithdrawal,
  getDepositByRefId,
  getWalletById,
  getWithdrawalByRefId,
  patchWalletById,
} from "../database.js";
import { v4 as uuid } from "uuid";
import { walletStatus } from "../constants/index.js";

export const deposit = async (req, res, next) => {
  try {
    const walletData = await getWalletById(req.headers.wid);
    const deposit_at = new Date().toISOString();
    const deposit_id = uuid();
    const amount = parseInt(req.body.amount);

    if (walletData[0].status === walletStatus.DISABLED) {
      throw new Error("Wallet is disabled");
    }

    const responseBody = {
      id: deposit_id,
      amount,
      reference_id: req.body.reference_id,
      deposit_by: walletData[0].owned_by,
      deposit_at,
      status: "success",
      wallet_id: req.headers.wid,
    };

    const depositData = await getDepositByRefId(req.body.reference_id);

    if (depositData.length > 0) {
      throw new Error("Deposit with Reference ID exists");
    }

    await createDeposit(
      deposit_id,
      req.headers.wid,
      amount,
      req.body.reference_id,
      walletData[0].owned_by,
      deposit_at
    );

    await patchWalletById(req.headers.wid, {
      balance: walletData[0].balance + amount,
    });

    res.send(responseBody);
  } catch (e) {
    next(e);
  }
};

export const withdraw = async (req, res, next) => {
  try {
    const walletData = await getWalletById(req.headers.wid);
    const withdrawn_at = new Date().toISOString();
    const withdrawal_id = uuid();
    const amount = parseInt(req.body.amount);

    if (walletData[0].status === walletStatus.DISABLED) {
      throw new Error("Wallet is disabled");
    }

    if (walletData[0].balance < amount) {
      throw new Error("Balance not sufficient for withdrawal");
    }

    const withdrawalData = await getWithdrawalByRefId(req.body.reference_id);

    if (withdrawalData.length > 0) {
      throw new Error("Withdrawal with Reference ID exists");
    }

    await createWithdrawal(
      withdrawal_id,
      req.headers.wid,
      amount,
      req.body.reference_id,
      walletData[0].owned_by,
      withdrawn_at
    );

    await patchWalletById(req.headers.wid, {
      balance: walletData[0].balance - amount,
    });

    res.send({
      id: withdrawal_id,
      amount,
      reference_id: req.body.reference_id,
      withdrawn_by: walletData[0].owned_by,
      withdrawn_at,
      status: "success",
    });
  } catch (e) {
    next(e);
  }
};
