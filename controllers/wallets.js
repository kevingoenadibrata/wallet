import { v4 as uuid } from "uuid";
import { SECRET } from "../constants/secret.js";
import jwt from "jsonwebtoken";
import { walletStatus } from "../constants/index.js";
import jsend from "jsend";
import {
  createNewWallet,
  getWalletByCustomerXid,
  getWalletById,
  patchWalletById,
} from "../database.js";

export const initiateWallet = async (req, res, next) => {
  try {
    const id = uuid();
    const token = jwt.sign({ id }, SECRET);

    const walletData = await getWalletByCustomerXid(req.body.customer_xid);

    if (walletData.length > 0) {
      throw new Error("Customer XID exists");
    }

    await createNewWallet(id, req.body.customer_xid);

    res.send(jsend.success({ token }));
  } catch (e) {
    return next(e);
  }
};

export const enableWallet = async (req, res, next) => {
  try {
    const walletData = await getWalletById(req.headers.wid);

    if (walletData[0].status === walletStatus.ENABLED) {
      throw new Error("Wallet is already disabled");
    }

    const results = await patchWalletById(req.headers.wid, {
      status: walletStatus.ENABLED,
    });
    const responseBody = {
      ...results[0],
      enabled_at: new Date().toISOString(),
    };
    res.send(jsend.success(responseBody));
  } catch (e) {
    return next(e);
  }
};

export const disableWallet = async (req, res, next) => {
  try {
    const walletData = await getWalletById(req.headers.wid);

    if (walletData[0].status === walletStatus.DISABLED) {
      throw new Error("Wallet is already disabled");
    }

    const results = await patchWalletById(req.headers.wid, {
      status: walletStatus.DISABLED,
    });
    const responseBody = {
      ...results[0],
      disabled_at: new Date().toISOString(),
    };
    res.send(jsend.success(responseBody));
  } catch (e) {
    return next(e);
  }
};

export const getWallet = async (req, res, next) => {
  try {
    const walletData = await getWalletById(req.headers.wid);

    if (walletData[0].status === walletStatus.DISABLED) {
      throw new Error("Wallet is disabled");
    }

    res.send(jsend.success(walletData));
  } catch (e) {
    return next(e);
  }
};
