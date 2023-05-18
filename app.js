//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// Loads the full build.
const _ = require("lodash");

const homeStartingContent = "Welcome to my Blog Page";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts = [
  {
    title: "",
    content: "",
  },
];
//function to truncate text on home page
function text_truncate(str, length, ending) {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  // Truncate the content of each post
  const truncatedPosts = posts.map((post) => ({
    ...post,
    content: text_truncate(post.content, 100, "..."),
  }));

  // Renders key-value pairs, where the first one is in the views EJS and then linked to the constants in app.js
  res.render("home", {
    startingContent: homeStartingContent,
    posts: truncatedPosts,
  });
});

app.get("/about", function (req, res) {
  //renders key value pairs the first is in the views ejs, then link to the const in app.js
  res.render("about", { about: aboutContent });
});

app.get("/contact", function (req, res) {
  //renders key value pairs the first is in the views ejs, then link to the const in app.js
  res.render("contact", { contact: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", { title: post.title, content: post.content });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
