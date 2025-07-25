import ImageKit from "imagekit";
import dotenv from "dotenv";

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const getAuthParams = (req, res) => {
  try {
    const auth = imagekit.getAuthenticationParameters();
    res.json(auth);
  } catch (error) {
    res.status(500).json({ message: "ImageKit auth error" });
  }
};
