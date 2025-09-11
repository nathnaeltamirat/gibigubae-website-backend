import { v2 as cloudinary } from 'cloudinary';
import { API_KEY, API_SECRET, CLOUD_NAME } from '../config/env.js';
import type { Express } from 'express';

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string
): Promise<string> => {
  try {
    if (!file || !file.buffer) throw new Error('No file buffer provided');
    console.log('File MIME type:', file.mimetype, 'Buffer size:', file.buffer.length);

    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      {
        folder,
        use_filename: false,
        overwrite: true,
        resource_type: 'image',
      }
    );

    return result.secure_url;
  } catch (err) {
    console.error('Cloudinary upload failed:', (err as Error).message, (err as Error).stack);
    throw new Error('Failed to upload image to Cloudinary');
  }
};