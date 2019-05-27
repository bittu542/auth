const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_I = 10;
const jwt = require('jsonwebtoken');
const userScehma = mongoose.Schema({
     email: {
         type:String,
         required:true,
         trim:true,
         unique:1
    },
     password:{
        type:String,
        required:true,
        minlength:6
   },
   token:{
       type:String

   }
})

userScehma.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){
    bcrypt.genSalt(SALT_I,function(err,salt){
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err){
                return next(err);
            } 
            user.password = hash;
            next();
        })
    })
}else{
    next();
}

})

userScehma.methods.comparePasswords = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,(err,isMatch)=>{
        if(err){
            cb(err);
        }
        cb(null,isMatch);
    })
}

userScehma.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),'supersecret');

    user.token = token;
    user.save(function(err,user){
        if(err)
        return cb(err);
        else
        return cb(null,user);
    })
}

userScehma.statics.findByToken = function(token,cb){
    const user = this;
    jwt.verify(token,'supersecret',(err,decode)=>{

        user.findOne({"_id":decode,"token":token},(err,user)=>{
            if(err) throw err;
            cb(null,user);
        })
    })
}

const User = mongoose.model('User',userScehma)


module.exports = {User}