const BusinessOwners = require("../Models/BizOwnerModel");

module.exports.Search = async (req, res) => {
  const query = req.query.query;

  try {
    const results = await BusinessOwners.find({
      name: { $regex: query, $options: "i" },
    });
    res.json(results);
  } catch (error) {
    console.error("Error performing text search:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
