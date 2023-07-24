const multer = require("multer");
const fs = require("fs");

// Create the 'uploads/' directory if it doesn't exist
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where the uploaded files should be stored
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate a unique file name for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".pdf");
  },
});

module.exports.upload = multer({
  storage: storage,
});
