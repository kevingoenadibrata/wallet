import { walletStatus } from "./constants/index.js";
import { USE_LOCAL_DB } from "./constants/secret.js";
import { client } from "./credentials/mysql.js";
import {
  createDepositFake,
  createNewWalletFake,
  createWithdrawalFake,
  getDepositByRefIdFake,
  getWalletByCustomerXidFake,
  getWalletByIdFake,
  getWithdrawalsByRefIdFake,
  patchWalletByIdFake,
} from "./fakedb.js";

const isoToMySQLDateTime = (iso) => {
  let temp = iso;
  temp = temp.slice(0, 19).replace("T", " ");
  return temp;
};

export const createNewWallet = async (id, owned_by) => {
  if (USE_LOCAL_DB === "1") {
    return createNewWalletFake(id, owned_by);
  }

  await client("Wallets").insert({
    id,
    owned_by,
    status: walletStatus.DISABLED,
    balance: 0,
  });
  return { status: "success" };
};

export const getWalletById = async (id) => {
  if (USE_LOCAL_DB === "1") {
    return getWalletByIdFake(id);
  }

  const res = await client("Wallets").where({ id });
  return res;
};

export const getWalletByCustomerXid = async (customer_xid) => {
  if (USE_LOCAL_DB === "1") {
    return getWalletByCustomerXidFake(customer_xid);
  }
  const res = await client("Wallets").where({
    owned_by: customer_xid,
  });
  return res;
};

export const patchWalletById = async (id, data) => {
  if (USE_LOCAL_DB === "1") {
    return patchWalletByIdFake(id, data);
  }
  await client("Wallets")
    .where({
      id,
    })
    .update(data);
  const res = await getWalletById(id);

  return res;
};

export const createDeposit = async (
  deposit_id,
  wallet_id,
  amount,
  reference_id,
  deposit_by,
  deposit_at
) => {
  if (USE_LOCAL_DB === "1") {
    return createDepositFake(
      deposit_id,
      wallet_id,
      amount,
      reference_id,
      deposit_by,
      deposit_at
    );
  }
  await client("Deposits").insert({
    id: deposit_id,
    deposit_by: deposit_by,
    reference_id: reference_id,
    deposit_at: isoToMySQLDateTime(deposit_at),
    amount: amount,
    wallet_id: wallet_id,
  });
  return { status: "success" };
};

export const getDepositByRefId = async (reference_id) => {
  if (USE_LOCAL_DB === "1") {
    return getDepositByRefIdFake(reference_id);
  }
  const res = await client("Deposits").where({
    reference_id: reference_id,
  });
  return res;
};

export const getWithdrawalByRefId = async (reference_id) => {
  if (USE_LOCAL_DB === "1") {
    return getWithdrawalsByRefIdFake(reference_id);
  }
  const res = await client("Withdrawals").where({
    reference_id: reference_id,
  });
  return res;
};

export const createWithdrawal = async (
  withdrawal_id,
  wallet_id,
  amount,
  reference_id,
  withdrawn_by,
  withdrawn_at
) => {
  if (USE_LOCAL_DB === "1") {
    return createWithdrawalFake(
      withdrawal_id,
      wallet_id,
      amount,
      reference_id,
      withdrawn_by,
      withdrawn_at
    );
  }

  await client("Withdrawals").insert({
    id: withdrawal_id,
    withdrawn_by,
    reference_id,
    withdrawn_at: isoToMySQLDateTime(withdrawn_at),
    amount,
    wallet_id,
  });

  return { status: "success" };
};
