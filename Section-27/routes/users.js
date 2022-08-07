const express = require("express");
const uuid = require("uuid");

const multer = require("multer");
const multerStorageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + uuid.v4(file));
  },
});

const db = require("../database/database");

const router = express.Router();
const upload = multer({ storage: multerStorageConfig });

router.get("/", async function (req, res) {
  const users = await db.getDb().collection("users").find().toArray();
  res.render("profiles", { users: users });
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

router.post("/profiles", upload.single("image"), async function (req, res) {
  const userImage = req.file;
  const userName = req.body.username;

  await db
    .getDb()
    .collection("users")
    .insertOne({ name: userName, image: { path: userImage.path } });

  res.redirect("/");
});

module.exports = router;
