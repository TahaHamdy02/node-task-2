const {
  Post,
  validateCreatePost,
  validateUpdatePost,
} = require("../models/Post");
module.exports.createPostCtrl = async (req, res) => {
  try {
    //validatetion data
    const { error } = validateCreatePost(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    //create new post and save it in db
    const post = new Post({
      ...req.body,
      user: req.user.id,
    });

    await post.save();
    res.status(201).json({
      message: "your post created sucessfully",
      post,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
