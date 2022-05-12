const router = require('express').Router();
const User = new (require('../controller/user.controller'))()

router.get('/', async (req, res) => {
  res.send({totalRows: (await User.users()).length, data: await User.users()});
});

router.post('/login', async(req, res) => {
  try {
    const result = await User.login(req.body);
    if (typeof(result)=='object' && result.length>0) {
      res.status(200).json(result)
    }
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

router.delete('/delete_acc', async(req, res) => {
  try {
    const result = await User.deleteAcc(req.user_id);
    res.status(200).json(result);
  } catch (err) {
    res.status(304).send(err.message);
    
  }
})

router.patch('/forgert_pass', async(req, res) => {
  try {
    const result = await User.forgetPass(req.user_id, req.body.password)
    res.status(200).json(result);
  } catch (err) {
    res.status(304).send(err.message);
  }
})

module.exports = router;
