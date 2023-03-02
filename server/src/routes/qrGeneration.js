const qrcode = require('qrcode');
const { Qr } = require("../db");
const axios = require("axios");
const { Router } = require("express");
const router = Router();
const Jimp = require("jimp");
const layoutJpeg = "./src/routes/images/prueba-consumision-1.jpg";
const sendEmail = require("./sendEmail").sendEmail;
const sendWp = require("./sendWp").sendWp;
// const { uploadImage } = require('./storage');
// const { Storage } = require('@google-cloud/storage');
// const { GOOGLE_APPLICATION_CREDENTIALS, PROJECT_ID } = process.env;
// const credentials = (JSON.parse(GOOGLE_APPLICATION_CREDENTIALS))
// const storage = new Storage({
//   projectId: PROJECT_ID,
//   credentials,
// });

router.post("/", async (req, res, next) => {
  const type = "cons";
  const { n, email, wp } = req.body;
  const resArray = [];
  const imgArray= [];
  const bucketName = "bar-qrcodes-bucket-1";
  const layoutImageFilename = "prueba-consumision-1.jpg";
  for (let i = 0; i < n; i++) {
    const newQr = await Qr.create({ type });
    const link = "http://localhost:3000/qr/" + newQr.id;
    console.log(link)
    try {
      const buffer = await qrcode.toBuffer(link, { type: 'url' });
      const [qrCodeImage, layoutImage] = await Promise.all([
        Jimp.read(buffer),
        Jimp.read(`../public/${layoutImageFilename}`),
      ]);
      qrCodeImage.resize(3000, 3000);
      const x = (layoutImage.bitmap.width - qrCodeImage.bitmap.width) / 2;
      const y = (layoutImage.bitmap.height - qrCodeImage.bitmap.height) / 2;
      layoutImage.composite(qrCodeImage, x, y);
  
      const mergedImageBuffer = await new Promise((resolve, reject) => {
        layoutImage.getBuffer(Jimp.MIME_JPEG, (error, buffer) => {
          if (error) {
            reject(error);
          } else {
            resolve(buffer);
          }
        });
      });
      const date = new Date();
      const dateString = `${date.getFullYear().toString().slice(2)}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date.getHours().toString().padStart(2, '0')}Hrs-${date.getMinutes().toString().padStart(2, '0')}Mins-${date.getSeconds().toString().padStart(2, '0')}`;
      const imageName = `QRCode-${dateString}.${layoutImage.getExtension()}`;      
      // const publicUrl = await uploadImage(mergedImageBuffer, imageName, bucketName);
      resArray.push(mergedImageBuffer);
      // imgArray.push(publicUrl);

    } catch (error) {
      console.log(error)
      return res.status(500).send('Error generating QR code');
    }
  }
  // if(email){
  //   sendEmail(imgArray, email);
  // }
  if (wp){
    console.log(wp)
  }
  return res.json({ images: resArray });
});


router.post("/:id", async (req,res,next)=>{
  const id = req.params.id;
  try{
    const qr = await Qr.findByPk(id)
      qr.status = true;
      qr.save();
      res.set('Content-Type', 'text/plain');
      res.send("ok");
  }
  catch(error){
    next(error)
  }
})


router.get("/status/:id", async(req,res,next)=>{
  const id = req.params.id;
  try{
    const qr = await Qr.findByPk(id)
    res.send(qr.status)
  }
  catch(error){
    next(error)
  }
})
module.exports = router;