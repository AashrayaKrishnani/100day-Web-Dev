const express = require("express");

const ObjectId = require("mongodb").ObjectId;

const mongo = require("../database/mongo");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const posts = await mongo
    .getDb()
    .collection("posts")
    .find({}, { title: 1, author: 1, summary: 1 })
    .toArray();

  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async function (req, res) {
  const authors = await mongo.getDb().collection("authors").find().toArray();

  res.render("create-post", { authors: authors });
});

router.post("/new-post", async function (req, res) {
  const input = req.body;

  // Getting author name.
  const author = await mongo
    .getDb()
    .collection("authors")
    .findOne({ _id: ObjectId(req.body.author_id) });

  // Saving Post.
  await mongo
    .getDb()
    .collection("posts")
    .insertOne({
      title: input.title,
      body: input.content,
      summary: input.summary,
      date: new Date(),
      author: {
        name: author.name,
        _id: ObjectId(input.author_id),
        email: author.email,
      },
    });

  res.redirect("/posts");
});

router.get("/post-details/:id", async function (req, res) {
  let id;

  try {
    id = ObjectId(req.params.id);
  } catch (error) {
    return res.status(404).render("404");
  }
  const result = await mongo.getDb().collection("posts").findOne({ _id: id });

  if (!result || result == undefined || result == null) {
    return res.status(404).render("404");
  }

  const post = result;
  post.date = new Date(post.date);

  post.humanReadableDate = post.date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  res.render("post-details", { post: post });
});

router.get("/update-post/:id", async function (req, res) {
  let id;

  try {
    id = ObjectId(req.params.id);
  } catch (error) {
    return res.status(404).render("404");
  }

  const post = await mongo.getDb().collection("posts").findOne({ _id: id });

  if (!post || post == undefined || post == null) {
    return res.status(404).render("404");
  }

  const author_id = post.author._id;

  if (author_id != req.query.author_id) {
    return res.status(701).render("701");
  }

  res.render("update-post", { post: post });
});

router.post("/update-post/:id", async function (req, res) {
  let id;

  try {
    id = ObjectId(req.params.id);
  } catch (error) {
    return res.status(404).render("404");
  }

  const queryResult = await mongo
    .getDb()
    .collection("posts")
    .findOne({ _id: id }, { "author._id": 1 });
  const post = req.body;

  if (!queryResult) {
    return res.status(404).render("404");
  }

  if (queryResult.author._id != req.body.author_id) {
    return res.status(701).render("701");
  }

  await mongo
    .getDb()
    .collection("posts")
    .updateOne(
      { _id: id },
      { $set: { title: post.title, summary: post.summary, body: post.content } }
    );

  res.redirect("/posts");
});

router.get("/delete-post/:id", async function (req, res) {
  let id;

  try {
    id = ObjectId(req.params.id);
  } catch (error) {
    return res.status(404).render("404");
  }

  const post = await mongo.getDb().collection("posts").findOne({ _id: id });

  if (!post || post == undefined || post == null) {
    return res.status(404).render("404");
  }

  const author_id = post.author._id;

  if (author_id != req.query.author_id) {
    return res.status(701).render("701");
  }

  res.render("delete-post", { post: post });
});

router.post("/delete-post/:id", async function (req, res) {
  let id;

  try {
    id = ObjectId(req.params.id);
  } catch (error) {
    return res.status(404).render("404");
  }

  const queryResult = await mongo
    .getDb()
    .collection("posts")
    .findOne({ _id: id }, { "author._id": 1 });
  const post = req.body;

  if (!queryResult) {
    return res.status(404).render("404");
  }

  if (queryResult.author._id != post.author_id) {
    return res.status(701).render("701");
  }

  await mongo.getDb().collection("posts").deleteOne({ _id: id });
  res.redirect("/posts");
});

router.get("/add-author", function (req, res) {
  res.render("add-author");
});

router.post("/add-author", async function (req, res) {
  await mongo.getDb().collection("authors").insertOne({
    name: req.body.name,
    email: req.body.email.toString().toLowerCase(),
  });

  res.redirect("/new-post");
});

module.exports = router;
