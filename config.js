import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: "dhel9weod",
    api_key:"936395869866143" ,
   api_secret:"Qv4OCIFyo3BUSlHEZkIRTUP57kw",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary, 
  params: (req, file) => ({
    folder: "upload",
    format: file.mimetype.split("/")[1], // Dynamically detect file format
    public_id: file.originalname.split(".")[0], // Use original filename (without extension)
  }),
});

export const parser = multer({ storage});
