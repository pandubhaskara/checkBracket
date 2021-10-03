const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dshzlncww",
  api_key: "171975557362161",
  api_secret: "QMLVcP8Tib2SdMtPbiiOZHW6TKI",
});
module.exports = (fieldName)=>{
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "MiniProject",
  },
});

const upload = multer({storage: storage,
  // limits: {
  //     fileSize: maxSize
  // }
}).single(fieldName)

return(req,res,next)=>{
  upload(req,res,(arr)=>{
    return next();
  })
}
}
// module.exports.upload = multer({ storage: storage }), upload;
