import { walletStatus } from "./constants/index.js";

let DB_WALLETS = [];
let DB_DEPOSITS = [];
let DB_WITHDRAWALS = [];

const isoToMySQLDateTime = (iso) => {
  let temp = iso;
  temp = temp.slice(0, 19).replace("T", " ");
  return temp;
};

export const createNewWalletFake = (id, owned_by) => {
  DB_WALLETS.push({
    id,
    owned_by,
    status: walletStatus.DISABLED,
    balance: 0,
  });

  return { status: "success" };
};

export const getWalletByIdFake = (id) => {
  let returnArr = [];
  for (let i = 0; i < DB_WALLETS.length; i++) {
    if (DB_WALLETS[i].id === id) {
      returnArr.push(DB_WALLETS[i]);
    }
  }
  return returnArr;
};

export const getWalletByCustomerXidFake = (customer_xid) => {
  let returnArr = [];
  for (let i = 0; i < DB_WALLETS.length; i++) {
    if (DB_WALLETS[i].owned_by === customer_xid) {
      returnArr.push(DB_WALLETS[i]);
    }
  }
  return returnArr;
};

export const patchWalletByIdFake = (id, data) => {
  for (let i = 0; i < DB_WALLETS.length; i++) {
    if (DB_WALLETS[i].id === id) {
      for (const property in data) {
        if (!(property in DB_WALLETS[i])) {
          throw new Error("Trying to update an unidentified property");
        }
        DB_WALLETS[i][property] = data[property];
      }
      return [DB_WALLETS[i]];
    }
  }
};

export const createDepositFake = (
  deposit_id,
  wallet_id,
  amount,
  reference_id,
  deposit_by,
  deposit_at
) => {
  DB_DEPOSITS.push({
    id: deposit_id,
    deposit_by: deposit_by,
    reference_id: reference_id,
    deposit_at: isoToMySQLDateTime(deposit_at),
    amount: amount,
    wallet_id: wallet_id,
  });
  return { status: "success" };
};

export const createWithdrawalFake = (
  withdrawal_id,
  wallet_id,
  amount,
  reference_id,
  withdrawn_by,
  withdrawn_at
) => {
  DB_DEPOSITS.push({
    id: withdrawal_id,
    withdrawn_by,
    reference_id,
    withdrawn_at: isoToMySQLDateTime(withdrawn_at),
    amount,
    wallet_id,
  });
  return { status: "success" };
};

export const getDepositByRefIdFake = async (reference_id) => {
  let returnArr = [];
  for (let i = 0; i < DB_DEPOSITS.length; i++) {
    if (DB_DEPOSITS[i].reference_id === reference_id) {
      returnArr.push(DB_DEPOSITS[i]);
    }
  }
  return returnArr;
};

export const getWithdrawalsByRefIdFake = async (reference_id) => {
  let returnArr = [];
  for (let i = 0; i < DB_WITHDRAWALS.length; i++) {
    if (DB_WITHDRAWALS[i].reference_id === reference_id) {
      returnArr.push(DB_WITHDRAWALS[i]);
    }
  }
  return returnArr;
};
