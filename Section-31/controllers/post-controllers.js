const Post = require("../models/post");

const validationSession = require("../utils/validation-session");
const validation = require("../utils/validation");

function getHome(req, res) {
  res.render("welcome", { csrfToken: req.csrfToken() });
}

async function getAdmin(req, res) {
  if (!res.locals.isAuth) {
    return res.status(401).render("401");
  }

  const posts = await Post.fetchAll();

  let sessionInputData = validationSession.getSessionErrorData(req);

  res.render("admin", {
    posts: posts,
    inputData: sessionInputData,
  });
}

async function createPost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!validation.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      function () {
        res.redirect("/admin");
      }
    );
    return;
  }

  const newPost = new Post(enteredTitle, enteredContent);

  await newPost.save();

  res.redirect("/admin");
}

async function getSinglePost(req, res, next) {
  let post;

  const postId = req.params.id;

  try {
    post = await Post.fetchOne(postId);
  } catch (error) {
    next(error);
    return;
  }

  if (!post) {
    return res.render("404"); // 404.ejs is missing at this point - it will be added later!
  }

  let sessionInputData = validationSession.getSessionErrorData(req, {
    title: post.title,
    content: post.content,
  });

  res.render("single-post", {
    post: post,
    inputData: sessionInputData,
  });
}

async function updatePost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;
  const postId = req.params.id;

  const editedPost = new Post(enteredTitle, enteredContent, postId);

  if (!validation.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      function () {
        res.redirect(`/posts/${req.params.id}/edit`);
      }
    );

    return;
  }

  await editedPost.save();

  res.redirect("/admin");
}

async function deletePost(req, res) {
  const postId = req.params.id;

  await Post.delete(postId);
  // await new Post("", "", postId).delete();

  res.redirect("/admin");
}

module.exports = {
  getHome: getHome,
  getAdmin: getAdmin,
  createPost: createPost,
  getSinglePost: getSinglePost,
  updatePost: updatePost,
  deletePost: deletePost,
};
