import express from "express";
import { router } from "./routes.js";
import multer from "multer";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const port = 3000;
const upload = multer();

app.use(upload.array());
app.use("/api/v1", router);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("HOLA AMIGOS");
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
