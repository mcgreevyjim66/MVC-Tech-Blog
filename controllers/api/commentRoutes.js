const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    console.log("*****************commentRoutes /:" + JSON.stringify(req.body));
    let createdByUser = req.session.user_name
    if (!createdByUser) { createdByUser = "ANONYMOUS" };
    console.log("********************** commentroutes.js createdByUser: ", createdByUser)
    const commentData = {...req.body, comment_created_by : createdByUser}
    const newComment = await Comment.create(
      commentData
    );

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    console.log("*****************commentroutes delete id:" + req.params.id);
    
    console.log("*****************commentroutes delete user_id:" + req.session.user_id);
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
