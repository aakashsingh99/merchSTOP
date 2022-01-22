import path from 'path'
import express from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary';
import dotenv from 'dotenv'
import { CloudinaryStorage} from 'multer-storage-cloudinary'

const router = express.Router()

dotenv.config()

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

/*
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Upload Images only [jpg/jpeg/png]!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  try{
    const convertedFilePath = req.file.path.replace(/\\/g, "/");
    cloudinary.v2.uploader.upload(convertedFilePath, 
        {folder: 'mernshop_products'},
        async  function(error, result) {
          if(error) {
            console.log(error);
          }
          else {
            // console.log(result)
              res.send(result.url)
            }
        }
    );
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
})
*/

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'mernshop_products',
    allowedFormats: ["jpg", "png", "jpeg"]
  },
});

const upload = multer({ storage })

router.post('/', upload.single('image'), (req, res) => {
  try{
    res.send(req.file.path);
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
})

export default router