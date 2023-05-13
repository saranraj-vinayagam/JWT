const express = require("express");
const authRoutes = express.Router();
const User = require("../models/User");
const { hashGenerate, hashValidator } = require("../helpers/hashing");
const {tokenGenerator} = require("../helpers/token");
const authVerify = require("../helpers/authVerify");

authRoutes.post("/signup", async (req, res) => {
  try {
    const hashPassword = await hashGenerate(req.body.password);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

authRoutes.post("/signin", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(400).json({ error: "Email is invalid" });
    }
    const checkUser = await hashValidator(
      req.body.password,
      existingUser.password
    );
    if (!checkUser) {
        return res.status(400).json({ error: "Password is invalid" });
    } else {
         const token = await tokenGenerator(existingUser.email);
         res.cookie("jwt",token);
         res.send(token);
        
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

authRoutes.get("/protected",authVerify,(req,res)=>{
    res.send("I am protected route")
})

module.exports = authRoutes;
