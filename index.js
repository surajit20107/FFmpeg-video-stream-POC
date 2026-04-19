import express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";

const app = express();
app.use(express.json())
app.use(express.urlencoded({
  extended: true,
}))
app.use("/uploads", express.static("uploads"))
app.use(cors({
  origin: "*",
}))
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get("/", function (_, res) {
  res.status(200).json({
    message: "Hello World",
  })
})

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
