const express = require("express");
const app = express();

const mongoose = require("mongoose");

const cloudinary = require("cloudinary").v2;

const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const { MONGO_URL, PORT, CLOUD_NAME, API_KEY, API_SECRET } = process.env;

const authRoute = require("./Routes/AuthRoute");
const searchRoute = require("./Routes/SearchRoute");
const requestRoute = require("./Routes/RequestRoute");
const dashboardRoute = require("./Routes/DashboardRoute");
const restaurantRoute = require("./Routes/RestaurantRoute");

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/api", authRoute);
app.use("/api", searchRoute);
app.use("/api", requestRoute);
app.use("/api", dashboardRoute);
app.use("/api", restaurantRoute);
