const cloudinary = require('cloudinary').v2;

const cloudinaryConfig = {
  cloud_name: 'dy2xwbxek',
  api_key: '963573259343579',
  api_secret: 'C3ILl7AlzAnIoNfMOxk6eZHoHaU'
};

cloudinary.config(cloudinaryConfig);

module.exports = cloudinary;
