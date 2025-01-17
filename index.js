require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const mqtt = require('mqtt');

const port = process.env.PORT || 3001;

app.use(express.json());

//settign routes
app.use("/api/excel",)

app.get('/', (req, res) => {
  res.send('hello world')
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal Server Error");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});