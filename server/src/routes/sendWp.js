// const { Storage } = require('@google-cloud/storage');
// const twilio = require('twilio');
// const { ACCOUNT_SID, AUTH_TOKEN, FROM_PHONE_NUMBER, PROJECT_ID } = process.env;

// const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

// const sendWp = async (images, to) => {
//   const storage = new Storage({
//     projectId: PROJECT_ID,
//     keyFilename: './src/routes/credentials/serv-acc-credential.json',
//   });

//   const bucketName = 'bar-qrcodes-bucket-1';

//   // Download the file data for each image and encode it in base64
//   const media = await Promise.all(images.map(async (image) => {
//     const file = storage.bucket(bucketName).file(image.split('/').pop());
//     const [data] = await file.download();
//     const base64Data = Buffer.from(data, 'binary').toString('base64');
//     return {
//       mediaUrl: `data:image/jpeg;base64,${base64Data}`
//     };
//   }));

//   // Send the message with media content
//    await client.messages.create({
//     from: `whatsapp:${FROM_PHONE_NUMBER}`,
//     to: `whatsapp:${to}`,
//     body: 'QR codes',
//     media: media
//   }).then(r=>console.log(r)).catch((error) => console.log(error));
// };

// module.exports = {
//     sendWp
// };

