const {User} = require('./../models/users');

let auth =  (req,res,next)=>{

    let token = req.cookies.auth;

    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) res.status(401).send('denied');
        
        req.token = token;
        next();
    })
}

module.exports = {auth}