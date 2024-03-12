const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const {verifyAccessToken}=require("../utils/verifyToken")


router.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
    if (existingUser) {
      if (existingUser.phone === phone) {
        return res
          .status(400)
          .json({ message: "Phone number already registered" });
      } else if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already registered" });
      }
    }
   
    const newUser = new User({
      name,
      phone,
      email,
      password
     
    });
    await newUser.save();

    return res
      .status(201)
      .json({ message: `User registered successfully!` });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res
      .status(200)
      .json({ token: accessToken, data: user, message: "Login Successful!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// router.post("/forget-password", async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await Person.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found!" });
//     }

//     const otp = generateOTP();
//     await sendOtpEmail(email, otp);

//     user.otp = otp;
//     user.otpExpiration = Date.now() + 300000;

//     await user.save();

//     return res.status(200).json({ message: `OTP Sent Successfully!` });
//   } catch (error) {
//     console.error("Error requesting password reset:", error);
//     return res.status(500).json({ message: "Internal Server Error!" });
//   }
// });

router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await Person.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.password=newPassword;
    
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password with OTP:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/profile", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProfile = {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      createdAt: user.createdAt,
    };
    return res.status(200).json({ user: userProfile });
  } catch (error) {
    console.error("Error while fetching user profile", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;
