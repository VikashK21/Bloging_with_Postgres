const router = require('express').Router();
const Blog = new (require('../controller/blog.controller'))()
const joi = require('joi');
const { authentication } = require('../auth/security.auth')

router.get('/blogs', async (req, res) => {
    const result = await Blog.blogs();
    res.status(200).json({ message: 'Hey this is the working page of Blog App.', data: result })
})

router.post('/new_post', authentication, async (req, res) => {
    const schemaValidate = joi.object({
        post_titles: joi.string().max(30).required(),
        posts: joi.string().max(100).required(),
        likes: joi.boolean(),
        dislikes: joi.boolean(),
    })
    const schemaValidated = schemaValidate.validate(req.body);
    if (schemaValidated.error) {
        return res.status(415).json(schemaValidated.error.details);
    }
    try {
        const result = await Blog.newPost(req.user_id, req.body)
        res.json(result);
    } catch (err) {
        res.status(304).send(err.message);

    }
})

router.post('/likes_dislikes/:id', async (req, res) => {
    const schemaValidate = joi.object({
        likes: joi.boolean(),
        dislikes: joi.boolean()
    })
    const schemaValidated = schemaValidate.validate(req.body);
    if (schemaValidated.error) {
        return res.status(415).json(schemaValidated.error.details);
    }
    try {
        const result = await Blog.likeDislikePost(req.params.id, req.body, req.user_id);
        res.json(result);
    } catch (err) {
        res.status(304).send(err.message);
    }
})



module.exports = router;