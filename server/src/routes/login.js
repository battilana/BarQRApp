const express = require('express');
const router = express.Router();
const { User } = require('../db');


// router.options("/loggedIn", (req, res) => {
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.send();
//   });
//   router.options("/login", (req, res) => {
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.send();
//   });

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        username,
        password,
      }
    });
  
    if (!user) {
      return res.json({ success: false });
    }
    user.loggedIn = true;
    user.save();
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;  
  try {
    const newUser = await User.create({
      username,
      password
    });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.get("/loggedIn", async (req, res, next) => {
    try {
      const username = req.query.username;
      const user = await User.findOne({ where: { username, loggedIn: true } });
      res.json({ loggedIn: user !== null });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
