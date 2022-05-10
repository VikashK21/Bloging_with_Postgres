const router = require('express').Router();
const User = new (require('../controller/user.controller'))()

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀', data: await User.users()});
});

router.post('/login', async(req, res) => {
  try {
    const result = await User.login();
    res.status(200).json(result)
  } catch (err) {
    res.status(406).send(err.message)
    
  }
});

router.post('/signup', async(req, res) => {
  try {
    const result = await User.newUser(req.body);
    res.status(201).json(result);
    
  } catch (err) {
    res.status(406).send(err.message)
    
  }
})

module.exports = router;
