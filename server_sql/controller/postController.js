const { v4: uuidv4 } = require("uuid");
const { Sequelize, where } = require("sequelize");
const sequelize = new Sequelize(
  "JobFinder_db",
  "root",
  "pamza2545", // Dont forget your password!!!
  {
    host: "localhost",
    dialect: "mysql",
  }
);
const Posts = require("../models/posts")(sequelize, Sequelize);
const jwt = require("jsonwebtoken");
const { post } = require("../routes/post");

require("dotenv").config();

//create a post
exports.createPost = (req, res) => {
  //pull title and details from body
  const { title, details, role } = req.body;
  //create a unique url for preventing collision
  let slug = uuidv4();
  //get bearer token from header
  var token = req.headers.authorization;
  //collect bearer token by slicing out "Bearer"
  var token = token ? token.slice(7) : null;
  //decode the encryption key and collect userInfo
  //userInfo = {userID, userName, userSub}
  var userInfo = jwt.verify(token, process.env.TOKEN_ENCODE);
  //collect userid
  var userName = userInfo.userName
  var ID = userInfo.userID;
  let today = new Date();

  switch (true) {
    //if not receiveing post title
    case !title:
      return res.status(400).json({ err: "no title" });
    //if not receiveing post details
    case !details:
      return res.status(400).json({ err: "no details" });
    //if not receiveing post role (avalible role)
    case !role:
      return res.status(400).json({ err: "no role" });
  }

  //create post model
  sequelize.sync().then(() => {
    Posts.create({
      p_slug: slug,
      p_title: title,
      p_author_id: userName,
      p_author: ID,
      p_detail: details,
      p_role: role,
      p_dtime: today,
    })
      .then((post) => {
        res.json(post);
      })
      .catch((err) => {
        res.status(400).json({ err: err });
      });
  });
};

//get all post
exports.getAllPost = (req, res) => {
  //find all post
  Posts.findAll().then((post) => {
    res.json(post);
  });
};

//update the post by slug
exports.updatePost = (req, res) => {
  //collect slug from url
  const { slug } = req.params;
  //collect title, details, role
  const { title, details, role } = req.body;

  Posts.update(
    { p_title: title, p_detail: details, p_role: role },
    { where: { p_slug: slug } }
  ).then((post) => {
    res.json(post);
  });
};

//show only the post that this author write
exports.getPost = (req, res) => {
  //get bearer token from header
  var token = req.headers.authorization;
  //remove word "Bearer"
  var token = token ? token.slice(7) : null;
  //authenticate user
  var userInfo = jwt.verify(token, process.env.TOKEN_ENCODE);
  if (userInfo) {
    var id = userInfo.userID;

    //find post from author id
    Posts.findOne({ where: { p_author: id } }).then((post) => {
      res.json(post);
    });
  }
};

//press the post and it will show only that post
exports.singlePost = (req, res) => {
  //collect slug data
  const { slug } = req.params;
  //find post by slug (uniqe url)
  Posts.findOne({ where: { p_slug: slug } }).then((post) => {
    res.json(post);
  });
};

//remove the post
exports.removePost = (req, res) => {
  //collect slug data
  const { slug } = req.params;
  //delete post by slug (uniqe url)
  Posts.destroy({
    where: { p_slug: slug },
  }).then((post) => {
    res.json(post);
  });
};
