const router = require('express').Router();
const User = new (require('../controller/user.controller'))()
const {authentication, authorization, forLogout} = require('../auth/security.auth');
const joi = require('joi');


router.get('/', async (req, res) => {
  res.send({totalRows: (await User.users()).length, data: await User.users()});
});

router.post('/login', forLogout, async(req, res) => {
  try {
    const result = await User.login(req.body);
    if (typeof(result)=='object' && result.length>0) {
      const token = await authorization(result)
      res.cookie('token', token).status(200).json(result)
    }
    else {
      res.status(404).send('The account does not exists!!')
    }
  } catch (err) {
    res.status(406).send(err.message)
    
  }
});

router.post('/signup', forLogout, async(req, res) => {
  const schemaValidate = 
  try {
    const result = await User.newUser(req.body);
    res.status(201).json(result);
    
  } catch (err) {
    res.status(406).send(err.message)
    
  }
})

router.delete('/delete_acc', authentication, async(req, res) => {
  try {
    const result = await User.deleteAcc(req.user_id);
    // res.json(result>0)
    if(result>0) {
      res.status(200).clearCookie('token').send('The account is no longer.');
    }
    else {
      res.status(404).send('The account does not exists!!')
    }
  } catch (err) {
    res.status(304).send(err.message);
  }
})

router.patch('/forgert_pass', authentication, async(req, res) => {
  try {
    const result = await User.forgetPass(req.user_id, req.body.password)
    res.status(200).json(result);
  } catch (err) {
    res.status(304).send(err.message);
  }
})

router.post('/logout', authentication, (req, res) => {
  res.status(200).clearCookie('token').send('You are successfully logged out.')
})

module.exports = router;
