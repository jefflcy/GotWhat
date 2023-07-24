const router = require("express").Router();

/* Import Controllers */
const { Search } = require("../Controllers/SearchController");

/* Search endpoint */
router.get("/search", Search);

module.exports = router;
