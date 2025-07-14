import ImageKit from "imagekit";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const upload = multer();

export const uploadVideo = [
  upload.single("file"),
  async (req, res) => {
    try {
      const file = req.file;
      if (!file) return res.status(400).json({ message: "No file uploaded" });
      const result = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        tags: ["course-video"],
      });
      res.json({ url: result.url });
    } catch (error) {
      res.status(500).json({ message: "ImageKit upload error", error });
    }
  }
];
