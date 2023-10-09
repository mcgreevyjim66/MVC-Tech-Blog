const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  console.log("************userroutes.js / ")
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_name = req.body.name;
      console.log("************userroutes.js user.name: ", req.session.user_name)
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  console.log("***************userroutes.js /login" + req)
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log("***************userroutes.js /login userData" + userData)
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      console.log("*********************************userroutes.js logged in req:" + req)
      req.session.user_name = userData.name;
      console.log("************userroutes.js user.name: ", req.session.user_name)
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  console.log("*******************userroutes.js /logout" + req)
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
