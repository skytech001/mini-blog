const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  await axios
    .post("http://localhost:4000/event", event)
    .catch((err) => console.log("error"));
  await axios
    .post("http://localhost:4001/event", event)
    .catch((err) => console.log("error"));
  await axios
    .post("http://localhost:4002/event", event)
    .catch((err) => console.log("error"));

  res.send({ status: "ok" });
});

app.listen(4005, () => {
  console.log("bus is listening at 4005");
});
