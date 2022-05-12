const jwt = require('jsonwebtoken');

authorization = (data) => {
    const token = jwt.sign(`${data[0].id}`, 'Thisissomestrongpassword');
    console.log(token);
    return token;
}

authentication = (req, res, next) => {
    const cookie = req.headers.cookie;
    console.log(cookie);
    if (cookie) {
        const token = cookie.split('=')[1];
        console.log(token);
        const id = jwt.verify(token, 'Thisissomestrongpassword')
        console.log(id);
        req.user_id = id;
        next()
    }
    else {
        res.status(401).send('Login first to proceed.')
    }
}

forLogout = (req, res, next) => {
    if (req.headers.cookie) {
        res.send('You are already Logged In!!')
    }
    next();
}




module.exports = {authentication, authorization, forLogout};