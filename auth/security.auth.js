const jwt = require('jsonwebtoken');

authorization = (data) => {
    const token = jwt.sign(`${data[0].id}`, 'Thisissomestrongpassword');
    return token;
}

authentication = (req, res, next) => {
    const cookie = req.headers.cookie;
    if (cookie) {
        const token = cookie.split('=')[1];
        const id = jwt.verify(token, 'Thisissomestrongpassword')
        req.user_id = Number(id);
        next()
    }
    else {
        res.status(401).send('Login first to proceed.')
    }
}

forLogout = (req, res, next) => {
    if (req.headers.cookie) {
        return res.send('You are already Logged In!!')
    }
    next();
    
}




module.exports = {authentication, authorization, forLogout};