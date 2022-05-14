const router = require('express').Router();
const User = new (require('../controller/user.controller'))()
const {authentication, authorization, forLogout} = require('../auth/security.auth');
const joi = require('joi');


router.get('/users', authentication, async (req, res) => {
  res.send({totalRows: (await User.allusers()).length, data: await User.allusers()});
});

router.post('/login', forLogout, async(req, res) => {
  const schemaValidate = joi.object({
    email: joi.string().email().max(50).required(),
    password: joi.string().min(8).max(16).required()
  })
  const schemaValidated = schemaValidate.validate(req.body);
  if (schemaValidated.error) {
    return res.status(415).json(schemaValidated.error.details)
  }
  try {
    const result = await User.login(req.body);
    console.log(result, 'login');
    if (typeof(result)=='object' && result.length>0) {
      const token = await authorization(result)
      res.cookie('token', token).status(200).send('You are successfully Logged In.')
    }
    else {
      res.status(404).send('The account does not exists!!')
    }
  } catch (err) {
    res.status(406).send(err.message)
    
  }
});

router.post('/signup', forLogout, async(req, res) => {
  const schemaValidate = joi.object({
    name: joi.string().max(30),
    email: joi.string().email().max(50).required(),
    password: joi.string().min(8).max(16).required()
  })
  const schemaValidated = schemaValidate.validate(req.body);
  if (schemaValidated.error) {
    return res.status(415).json(schemaValidated.error.details)
  }
  try {
    const result = await User.newUser(req.body);
    res.status(201).send(result);
    
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
  const schemaValidate = joi.object({
    password: joi.string().min(8).max(16).required()
  })
  const schemaValidated = schemaValidate.validate(req.body);
  if (schemaValidated.error) {
    return res.status(415).json(schemaValidated.error.details)
  }
  try {
    const result = await User.forgetPass(req.user_id, req.body.password)
    res.status(200).send(result);
  } catch (err) {
    res.status(304).send(err.message);
  }
})

router.post('/logout', authentication, (req, res) => {
  res.status(200).clearCookie('token').send('You are successfully logged out.')
})

module.exports = router;
