const express = require('express')
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jdekf4w.mongodb.net/cscie31?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("**** connected to mongo ****");
  })
  .catch((err) => {
    console.error(`database connection error: ${err}`);
    process.exit();
  });

const app = express(),
	port = 3000;

app.use(express.static('public'));

// routes
app.use(require('./routes/routes'));

app.listen(port, () => {
	console.log(`App started on port ${port}!`)
})