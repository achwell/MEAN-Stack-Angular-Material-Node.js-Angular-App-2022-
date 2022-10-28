const multer = require('multer');
const uploads = multer({ dest: "public/images" });
module.exports = uploads;
