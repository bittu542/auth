const bcrypt = require('bcrypt');
const {MD5} = require('crypto-js');
const jwt = require('jsonwebtoken');
// bcrypt.genSalt(10,(err,salt)=>{
//     if(err){
//         return next(err);
//     }
//     bcrypt.hash('pasword123',salt,(err,hash)=>{
//         if(err){
//             return next(err);
//         }
//         console.log(hash);
//     })
// })

// const secret = 'mypassword';
// const secretsalt = 'ghcdlcdcdcfvejvue';

// const user = {
//     id:1,
//     token: MD5('helloworld').toString() + secretsalt
// }

// const receivedToken = 'fc5e038d38a57032085441e7fe7010b0ghcdlcdcdcfvejvue';

// if(receivedToken === user.token){
//     console.log('moved');
// }else{
//     console.log('denied');
// }


// console.log(user);
const id  = '1000';
const secret = 'secretcode';
const receivedToken = 'eyJhbGciOiJIUzI1NiJ9.MTAwMA.ZHGBawcw3m0hQbhcmpWHnz4pBvrsFuf9GwlVKbE-knQ';
const token = jwt.sign(id,secret);
const decodeToken = jwt.verify(receivedToken,secret);

console.log(decodeToken);
