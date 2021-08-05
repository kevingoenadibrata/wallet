import jsend from "jsend";

export const errorHandler = (err, req, res, next) => {
  res.status(400).send(jsend.error(err.message));
  next();
};
