const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUD,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});


const newFilenameFunction = (og_filename, options) => {
  const newname =
    og_filename.split(".").slice(0, -1).join(".") +
    `${"-" + Date.now()}` +
    "." +
    (options.fileFormat || "webp"); 
  return newname;
};

// Fonction pour redimensionner l'image avec Sharp et envoyer à Cloudinary
const resizeAndUploadToCloudinary = (buffer, filename, options) => {
  return new Promise((resolve, reject) => {
    let image = sharp(buffer);

   
    if (options.resize) {
      image = image.resize(options.resize);
    }

    
    if (options.quality) {
      image = image.webp({ quality: options.quality });
    }

    
    image.toBuffer((err, resizedBuffer) => {
      if (err) {
        reject(err);
      } else {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto', public_id: filename },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result); 
            }
          }
        );

        
        streamifier.createReadStream(resizedBuffer).pipe(uploadStream);
      }
    });
  });
};


const storage = multer.memoryStorage(); 


const upload = multer({ storage });


const cloudinaryUploadMiddleware = (req, res, next) => {
  upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'pictures', maxCount: 10 }
  ])(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const files = req.files;

    
      if (files['cover']) {
        const coverFile = files['cover'][0];
        const coverFilename = newFilenameFunction(coverFile.originalname, { fileFormat: 'webp' });
        const coverOptions = {
          fileFormat: 'webp',
          quality: 80,
          resize: { width: 545, height: 310, fit: 'cover', withoutEnlargement: true }
        };
        const coverResult = await resizeAndUploadToCloudinary(coverFile.buffer, coverFilename, coverOptions);
        req.coverUrl = coverResult.secure_url; 
      }

      
      if (files['pictures']) {
        const pictureUrls = [];
        const pictureOptions = {
          fileFormat: 'webp',
          quality: 80,
          resize: { width: 1240, height: 640, fit: 'cover', withoutEnlargement: false }
        };

        for (const picture of files['pictures']) {
          const pictureFilename = newFilenameFunction(picture.originalname, { fileFormat: 'webp' });
          const pictureResult = await resizeAndUploadToCloudinary(picture.buffer, pictureFilename, pictureOptions);
          pictureUrls.push(pictureResult.secure_url); 
        }
        req.picturesUrls = pictureUrls; 
      }

      next(); 
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors du traitement des fichiers' });
    }
  });
};

module.exports = cloudinaryUploadMiddleware;
