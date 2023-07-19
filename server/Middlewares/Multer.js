const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // This will save the uploaded files in a folder named 'uploads' within your project directory
      const destinationPath = path.join('/Users/102al/Desktop/Orbital/GotWhat/server/', 'uploads');
      //callback function that determines the destination directory for the uploaded files
      cb(null, destinationPath);
    }, 
    filename: (req, file, cb) => {
          // Generate a unique filename for the uploaded file.
      // You can use Date.now() or any other logic to generate a unique filename.
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.pdf');
    },
  });
  
const upload = multer({ storage: storage });

module.exports = { upload };