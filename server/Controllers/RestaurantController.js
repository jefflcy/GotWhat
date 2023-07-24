const router = require("express").Router();
const Restaurant = require("../Models/BizOwnerModel");

module.exports.Restaurant = async (req, res) => {
  const restaurantId = req.params.restaurantId;

  try {
    // Find the restaurant with the matching _id
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching restaurant" });
  }
};
