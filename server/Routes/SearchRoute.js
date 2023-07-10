const router = require("express").Router();

/* Import Controllers */
const { Search } = require("../Controllers/SearchController");

// Example search data (replace with your actual data source)
/*
const searchData = [
  { id: 1, title: 'Result 1' },
  { id: 2, title: 'Result 2' },
  { id: 3, title: 'Result 3' },
];
*/

// Search endpoint
router.get("/search", Search);

module.exports = router;
