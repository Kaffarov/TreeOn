/**
 * Upload service placeholder
 * Handles file uploads (e.g., to cloud storage like AWS S3, Cloudinary)
 */

const upload = async (file) => {
  console.log(`[uploadService] Uploading file: ${file.originalname}`);
  // Simulate uploading and return a public URL
  return `https://storage.treeon.org/uploads/${Date.now()}_${file.originalname}`;
};

module.exports = {
  upload,
};