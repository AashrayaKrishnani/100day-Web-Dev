const express = require("express");

const router = express.Router();

const blogControllers = require("../controllers/post-controllers");
const protectionMiddleware = require("../middlewares/protection");

router.get("/", blogControllers.getHome);

router.use(protectionMiddleware.guardRoutes); // Guard following routes to only allow authenticated access :)

router.get("/admin", blogControllers.getAdmin);

router.post("/posts", blogControllers.createPost);

router.get("/posts/:id/edit", blogControllers.getSinglePost);

router.post("/posts/:id/edit", blogControllers.updatePost);

router.post("/posts/:id/delete", blogControllers.deletePost);

module.exports = router;
