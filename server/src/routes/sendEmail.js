const { Storage } = require('@google-cloud/storage');
const nodemailer = require('nodemailer');
const { PROJECT_ID, EMAIL, PASS, GOOGLE_APPLICATION_CREDENTIALS } = process.env;
const credentials = (JSON.parse(GOOGLE_APPLICATION_CREDENTIALS))

let transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: {EMAIL},
    pass: {PASS}
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false,
    starttls: true
  }
});
const sendEmail = async (images, to) => {
  const storage = new Storage({
    projectId: PROJECT_ID,
    credentials,
  });

  const bucketName = 'bar-qrcodes-bucket-1';

  // Download the file data for each image and create an attachment for it
  const attachments = await Promise.all(images.map(async (image) => {
    const file = storage.bucket(bucketName).file(image.split('/').pop());
    const [data] = await file.download();
    return {
      filename: image.split('/').pop(),
      content: data
    };
  }));

  let mailOptions = {
    from: 'fierrolabs@outlook.com',
    to: to,
    subject: 'QR codes',
    text: ':)',
    attachments: attachments
  };

  return await transporter.sendMail(mailOptions).catch((error) => console.log(error));
};

module.exports = {
  sendEmail
};
