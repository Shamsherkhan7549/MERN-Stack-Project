import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary'


cloudinary.config({
    cloud_name: process.env.API_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET_KEY
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'ecommerce',
      allowedFormat:async(req, res) => ['png', 'jpg', 'jpeg']

    },
  });


export {cloudinary, storage};