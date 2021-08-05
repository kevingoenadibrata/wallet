import validator from "validator";

export const initValidator = (req, res, next) => {
  try {
    if (!req.body.customer_xid) {
      throw new Error("there is no customer_xid in payload");
    }

    if (!validator.isUUID(req.body.customer_xid)) {
      throw new Error("customer_xid is not in a UUID form");
    }
    next();
  } catch (e) {
    next(e);
  }
};

export const disableValidator = (req, res, next) => {
  try {
    if (!req.body) {
      throw new Error("Invalid payload");
    }

    if (!req.body.is_disabled) {
      throw new Error("Invalid payload");
    }

    if (req.body.is_disabled !== "true") {
      throw new Error("Invalid payload");
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const transactionValidator = (req, res, next) => {
  try {
    if (!req.body.reference_id || !req.body.amount) {
      throw new Error("Bad Payload");
    }

    if (!validator.isNumeric(req.body.amount)) {
      throw new Error("Bad Payload: Amount not numeric");
    }

    if (parseInt(req.body.amount) < 0) {
      throw new Error("Bad Payload: Amount can't be negative");
    }

    if (!validator.isUUID(req.body.reference_id)) {
      throw new Error("reference_id is not in a UUID form");
    }

    next();
  } catch (e) {
    next(e);
  }
};
