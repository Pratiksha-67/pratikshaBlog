// app.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/test");

// Schema and Model
const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postSchema);

// Routes
// Routes
app.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.render("index", { posts: posts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/newpost", (req, res) => {
  res.render("newpost");
});

app.post("/newpost", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    await post.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
