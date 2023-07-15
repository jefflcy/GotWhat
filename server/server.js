//express app
const express = require("express");
const app = express();

const mongoose = require("mongoose");

const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

const authRoute = require("./Routes/AuthRoute");
const searchRoute = require("./Routes/SearchRoute");
const requestRoute = require("./Routes/RequestRoute");

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

//listen for requests
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/api", authRoute);
app.use("/api", searchRoute);
app.use("/api", requestRoute);
