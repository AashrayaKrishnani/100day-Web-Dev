const express = require("express");

const db = require("../database/db");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const [posts, _] = await db.query(
    "SELECT posts.*, authors.name AS author FROM posts JOIN authors ON posts.author_id = authors.id;"
  );
  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async function (req, res) {
  const [authors, _] = await db.query("SELECT * FROM authors;");
  res.render("create-post", { authors: authors });
});

router.post("/new-post", async function (req, res) {
  const input = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];

  await db.execute(
    "INSERT INTO posts (title, summary, body, author_id) VALUES ( ?, ?, ?, ? );",
    input
  ); // input.author here is actually the author_id :);

  res.redirect("/posts");
});

router.get("/post-details/:id", async function (req, res) {
  const id = req.params.id;

  const [result, _] = await db.query(
    "SELECT posts.*, authors.name AS author, authors.email AS email FROM posts JOIN authors ON posts.author_id = authors.id WHERE posts.id = ?",
    [id]
  );

  if (!result || result.length == 0) {
    return res.status(404).render("404");
  }

  const post = result[0];

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
  const id = req.params.id;

  const [posts, _] = await db.query(
    "SELECT posts.*, authors.name AS author FROM posts JOIN authors ON posts.author_id = authors.id WHERE posts.id = ?",
    [id]
  );

  if (!posts || posts == undefined || posts == null || posts.length == 0) {
    return res.status(404).render("404");
  }

  const author_id = posts[0].author_id;

  if (author_id != req.query.author_id) {
    return res.status(701).render("701");
  }

  res.render("update-post", { post: posts[0] });
});

router.post("/update-post/:id", async function (req, res) {
  const id = req.params.id;

  const [posts, _] = await db.query(
    "SELECT author_id FROM posts JOIN authors ON posts.author_id = authors.id WHERE posts.id = ?",
    [id]
  );

  if (!posts || posts == undefined || posts == null || posts.length == 0) {
    return res.status(404).render("404");
  }

  const author_id = posts[0].author_id;

  if (author_id != req.body.author_id) {
    return res.status(701).render("701");
  }

  const post = req.body;

  await db.execute(
    "UPDATE posts SET title=?, summary=?, body=?, date =CURRENT_TIMESTAMP WHERE id=?;",
    [post.title, post.summary, post.content, id]
  );

  res.redirect("/posts");
});

router.get("/delete-post/:id", async function (req, res) {
  const id = req.params.id;

  const [posts, _] = await db.query(
    "SELECT posts.*, authors.name AS author, authors.email AS email FROM posts JOIN authors ON posts.author_id = authors.id WHERE posts.id = ?",
    [id]
  );

  if (!posts || posts == undefined || posts == null || posts.length == 0) {
    return res.status(404).render("404");
  }

  const author_id = posts[0].author_id;

  if (author_id != req.query.author_id) {
    return res.status(701).render("701");
  }

  res.render("delete-post", { post: posts[0] });
});

router.post("/delete-post/:id", async function (req, res) {
  const id = req.params.id;

  const [posts, _] = await db.query(
    "SELECT author_id FROM posts JOIN authors ON posts.author_id = authors.id WHERE posts.id = ?",
    [id]
  );

  if (!posts || posts == undefined || posts == null || posts.length == 0) {
    return res.status(404).render("404");
  }

  const author_id = posts[0].author_id;

  if (author_id != req.body.author_id) {
    return res.status(701).render("701");
  }

  const post = req.body;

  await db.execute("DELETE FROM posts WHERE id=?;", [id]);

  res.redirect("/posts");
});

router.get("/add-author", function (req, res) {
  res.render("add-author");
});

router.post("/add-author", async function (req, res) {
  await db.execute("INSERT INTO authors (name, email) VALUES (?, ?);", [
    req.body.name,
    req.body.email.toString().toLowerCase(),
  ]);

  res.redirect("/new-post");
});

module.exports = router;
