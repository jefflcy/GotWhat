const router = require("express").Router();

/* Import Controllers */
const { Restaurant } = require("../Controllers/RestaurantController");

/* Restaurant endpoint */
router.get("/restaurants/:restaurantId", Restaurant);

module.exports = router;
