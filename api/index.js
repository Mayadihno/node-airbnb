const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const PlaceModel = require("./models/Places.js");
const BookingModel = require("./models/Bookings.js");
require("dotenv").config();

const saltRounds = bcrypt.genSaltSync(10);
const jwtSecret = "qwewtryujdtryhstzfweDzbnhdxbgzdf";

const app = express();
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
//R7NN22x40WWL95D5
mongoose.connect(process.env.MONGO_URL);

function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

//api for testing
app.get("/test", (req, res) => {
  res.json("text ok");
});

//api for creating user account
app.post("/register", async (req, res) => {
  //we are getting this data from cleint
  const { name, password, email } = req.body;
  try {
    const userDoc = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, saltRounds),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

//api for creating user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDocs = await UserModel.findOne({ email });
  if (userDocs) {
    const passOk = bcrypt.compareSync(password, userDocs.password);
    if (passOk) {
      jwt.sign(
        { email: userDocs.email, id: userDocs._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDocs);
        }
      );
    } else {
      res.json("Incorrect Password");
    }
  } else {
    res.json("User not Found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await UserModel.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photoMiddleWare = multer({ dest: "uploads/" });
app.post("/upload", photoMiddleWare.array("photos", 100), (req, res) => {
  const uploadesFiles = [];
  for (var i = 0; i < req.files.length; i++) {
    const { originalname, path } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPathName = path + `.` + ext;
    fs.renameSync(path, newPathName);
    uploadesFiles.push(newPathName.replace(`uploads\\`, ""));
  }
  res.json(uploadesFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    addedPhoto,
    address,
    description,
    perks,
    checkIn,
    checkout,
    guests,
    extraInfo,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDocs = await PlaceModel.create({
      owner: userData.id,
      title,
      photos: addedPhoto,
      address,
      description,
      perks,
      checkIn,
      checkOut: checkout,
      maxGuest: guests,
      extraInfo,
      price,
    });
    res.json(placeDocs);
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await PlaceModel.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await PlaceModel.findById(id));
});

app.put("/places/:id", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    addedPhoto,
    address,
    description,
    perks,
    checkIn,
    checkout,
    guests,
    price,
    extraInfo,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const placeDocs = await PlaceModel.findById(id);
    if (userData.id === placeDocs.owner.toString()) {
      placeDocs.set({
        title,
        photos: addedPhoto,
        address,
        description,
        perks,
        checkIn,
        checkOut: checkout,
        maxGuest: guests,
        extraInfo,
        price,
      });
      await placeDocs.save();
      res.json("ok");
    }
  });
});

app.get("/places", async (req, res) => {
  res.json(await PlaceModel.find());
});

app.post("/bookings", async (req, res) => {
  const userdata = await getUserDataFromToken(req);
  const { checkIn, checkOut, maxGuest, name, mobile, place, price } = req.body;

  const bookingDoc = await BookingModel.create({
    checkIn,
    checkOut,
    maxGuest,
    name,
    mobile,
    place,
    price,
    user: userdata.id,
  });
  res.json(bookingDoc);
});

app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromToken(req);
  res.json(await BookingModel.find({ user: userData.id }).populate("place"));
});
app.listen(4000);
