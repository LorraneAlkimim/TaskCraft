const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (_, res) => {
  return res.json({
    message: "Hello world",
  });
});

const PORT = process.env.NODE_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
