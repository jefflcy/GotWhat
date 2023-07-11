const router = require("express").Router();

/* Import Controllers */
const { Request } = require("../Controllers/RequestController");

// Request endpoint
router.post("/request", Request);

module.exports = router;
