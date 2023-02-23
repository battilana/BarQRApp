// storage.js
const { Storage } = require('@google-cloud/storage');
const { GOOGLE_APPLICATION_CREDENTIALS, PROJECT_ID } = process.env;
const credentials = (JSON.parse(GOOGLE_APPLICATION_CREDENTIALS))
const storage = new Storage({
  projectId: PROJECT_ID,
  credentials,
});
const uploadImage = async (imageBuffer, imageName, bucketName) => {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(imageName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: 'image/jpeg',
    },
  });

  return new Promise((resolve, reject) => {
    stream.on('error', (err) => {
      console.error(err);
      reject(err);
    });

    stream.on('finish', () => {
      console.log(`Saved image to ${imageName}`);
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${imageName}`;
      resolve(publicUrl);
    });

    stream.end(imageBuffer);
  });
};

module.exports = { uploadImage };
