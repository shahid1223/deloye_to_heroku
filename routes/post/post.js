const express = require('express');
const router = express.Router();
require('dotenv').config();
const { body, validationResult } = require("express-validator");
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');

/*@route  api/post/create
  @desc   this end point used to create posts
  @access private only loged in user can access it
*/
router.post('/create', [auth, [
  body('postimage', 'Image is required').not().isEmpty(),
  body('caption', 'Caption is required').not().isEmpty(),
  body('location', 'Location is required').not().isEmpty()
]], async (req, res) => {

  const errors = validationResult(req);
  /*if error then this if statement will execute and return*/
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), code: 400 });
  };

  /*if there no errror then this try catch statement will execute*/
  try {
    const { postimage, caption, location } = req.body;

    /* Find user for retriving object id */
    const user = await User.findById(req.user.id).select('-password');

    /* Create new post schema */
    const post = new Post({
      user: req.user.id,
      postimage: postimage,
      caption: caption,
      location: location
    });

    /* save schema into mongoDB */
    const result = await post.save();

    res.status(200).json({ result, code: 200 });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ err: "Internal server error", code: 500 });
  };
});

/*@route  api/allpost
  @desc   this end point used to fetch allpost
  @access private only loged in user can access it
*/
router.get('/allpost', auth, async (req, res) => {
  try {
    let allpost = await Post.find().populate('user', ['name', 'profileImage'], User)
    res.status(200).json({ allpost, code: 200 });
  } catch (errors) {
    console.error(errors.message);
    res.status(500).json({ err: "Internal server error", code: 500 });
  };
});

/*@route  api/post/:id
  @desc   this end point used to fetch single post by id
  @access private only loged in user can access it
*/
router.get('/:id', auth, async (req, res) => {
  try {
    /* find post by id  */
    let postById = await Post.findById(req.params.id).populate('user', ['name', 'profileImage'], User);

    /* If not post not fine by id then this error will execute */
    if (!postById) {
      res.status(404).json({ err: "Post not found", code: 404 });
    };

    //if postById
    res.status(200).json({ postById, code: 200 })

  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({
        err:
          error.kind === "ObjectId"
            ? "Post with this id not found"
            : "Internal server error",
        code: 500,
      });
  };
});

/*@route  api/post/update/:id
  @desc   this end point used to update post
  @access private only loged in user can access it
*/
router.post('/update/:id', auth, async (req, res) => {
  try {

    const { postimage, caption, location } = req.body;

    /* find post by id  */
    let post = await Post.findById(req.params.id).populate('user', ['name', 'profileImage'], User);

    /* If not post not fine by id then this error will execute */
    if (!post) {
      res.status(404).json({ err: "Post not found", code: 404 });
    };

    // console.log("auth", req.user.id === post.user._id.toString());

    /* if loged in user id is not equals to post user id then this condition will execute */
    if (req.user.id !== post.user._id.toString()) {
      res.status(401).json({ err: "Unauthorized", code: 401 });
    };

    if (postimage) {
      post.postimage = postimage;
    };
    if (caption) {
      post.caption = caption;
    };
    if (location) {
      post.location = location;
    };

    const result = await post.save();

    res.status(200).json({ result, code: 200 });

  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({
        err:
          error.kind === "ObjectId"
            ? "User with this id not found"
            : "Internal server error",
        code: 500,
      });
  };
});

/*@route  api/post/delete/:id
  @desc   this end point used to delete post
  @access private only loged in user can access it
*/
router.delete('/delete/:id', auth, async (req, res) => {
  try {

    /* find post by id  */
    let post = await Post.findById(req.params.id);

    /* If not post not fine by id then this error will execute */
    if (!post) {
      res.status(404).json({ err: "Post not found", code: 404 });
    };

    /* if loged in user id is not equals to post user id then this condition will execute */
    if (req.user.id !== post.user._id.toString()) {
      res.status(401).json({ err: "Unauthorized", code: 401 });
    };

    /* remove post from DB */
    await post.remove();

    res.status(200).json({ message: "Post deleted successfully", code: 200 });


  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({
        err:
          error.kind === "ObjectId"
            ? "User with this id not found"
            : "Internal server error",
        code: 500,
      });
  };
});

/*@route  api/post/like/:id
  @desc   this end point used to like posts
  @access private only loged in user can access it
*/
router.put('/like/:id', auth, async (req, res) => {
  try {
    /* find post by id */
    let post = await Post.findById(req.params.id);

    /* check if post is already liked or not if liked then we will remove the like if not like we will the post */
    if (post.like.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ err: "Post already liked", code: 400 });
    }

    /* push user object into post like array */
    post.like.unshift({ user: req.user.id });
    /* save post */
    post.save();

    res.status(200).json({ post, code: 200 });

  } catch (error) {
    console.error(error.message);
  };
});

/*@route  api/post/unlike/:id
  @desc   this end point used to unlike posts
  @access private only loged in user can access it
*/
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    /* find post by id */
    let post = await Post.findById(req.params.id);

    /* check if post is already liked or not if liked then we will remove the like if not like we will the post */
    if (post.like.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ err: "post has not yet been liked", code: 400 });
    };

    //get remove index
    const removeIndex = post.like.map(like => like.user.toString()).indexOf(req.user.id);

    /* remove like from likes array */
    post.like.splice(removeIndex, 1);

    /* then save user */
    await post.save();
    res.status(200).json({ post, code: 200 });
  } catch (error) {
    console.error(error.message);
  }
});

/*@route  api/post/comment/:id
  @desc   this end point used to comment on the posts
  @access private only loged in user can access it
*/
router.put('/comment/:post_id', [auth, [
  body('text', 'Comment text is required').not().isEmpty()
]], async (req, res) => {

  const errors = validationResult(req);
  /*if error then this if statement will execute and return*/
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), code: 400 });
  };

  try {
    /* find post by id */
    const post = await Post.findById(req.params.post_id).populate('user', ['name', 'profileImage'], User);

    /* If post not find then this code will execute and send error in response */
    if (!post) {
      return res.status(404).json({ error: "Post not found", code: 404 });
    };

    /* new Comment object */
    const newComment = {
      user: req.user.id,
      text: req.body.text,
      name: post?.user?.name,
      profileImage: post?.user?.profileImage
    };

    /* save comment into post comment array */
    post.commets.unshift(newComment);

    /* save updated post comment array into DB */
    const result = await post.save();

    res.status(200).json({ result, code: 200 });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ err: "Internal server error", code: 500 })
  };
});

/*@route  api/post/comment/update/:post_id/:comment_id
  @desc   this end point used to update comment on the posts
  @access private only loged in user can access it
*/
router.put('/comment/update/:post_id/:comment_id', [auth, [
  body('text', 'Comment text is required').not().isEmpty()
]], async (req, res) => {

  const errors = validationResult(req);
  /*if error then this if statement will execute and return*/
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), code: 400 });
  }

  try {

    const { text } = req.body;

    /* find post by id*/
    let post = await Post.findById(req.params.post_id);

    /* If not post not by id then this error will execute*/
    if (!post) {
      return res.status(404).json({ error: "Post not found", code: 404 });
    }

    let findComment = post.commets.find(comment => comment.id === req.params.comment_id);

    /* if comment not found in post comment array */
    if (!findComment) {
      return res.status(404).json({ error: "Comment not found", code: 404 });
    }


    /* if text then we will replace current comment text with text in body */
    if (text) {
      findComment.text = text;
    };

    /* then save the updated post into DB*/
    const result = await post.save();

    res.status(200).json({ result, code: 200 });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message, code: 500 });
  };
});

/*@route  api/post/comment/delete/:post_id/:comment_id
  @desc   this end point used to delete comment on the posts
  @access private only loged in user can access it
*/
router.delete('/comment/delete/:post_id/:comment_id', auth, async (req, res) => {
  try {
    /* find post by id*/
    let post = await Post.findById(req.params.post_id);

    /* If not post not by id then this error will execute*/
    if (!post) {
      return res.status(404).json({ error: "Post not found", code: 404 });
    }

    let findComment = post.commets.find(comment => comment.id === req.params.comment_id);

    /* if comment not found in post comment array */
    if (!findComment) {
      return res.status(404).json({ error: "Comment not found", code: 404 });
    };

    /* if posted post user is not equals to loged in user then he/she cannot delte post */
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "User not authorized", code: 401 })
    };


    /* finde index number of comment */
    const removeIndex = post.commets.map(comment => comment.id.toString()).indexOf(req.user.id);

    post.commets.splice(removeIndex, 1);
    await post.save();
    res.status(200).json({ post, code: 200 });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message, code: 500 });
  };
});

/*@route  api/post/posted/byuser
  @desc   this end point used to fetch legeed in user post
  @access private only loged in user can access it
*/
router.get('/posted/byuser', auth, async (req, res) => {
  try {
    /* find all the post where post user id is equals to loged in user id */
    const post = await Post.find({ user: { $eq: req.user.id } })

    /* if not posts */
    if (post.length === 0) {
      return res.status(404).json({ error: "user not posted any thing yed", code: 404 });
    };

    res.status(200).json({ post, code: 200 });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message, code: 500 });
  };
});


module.exports = router;