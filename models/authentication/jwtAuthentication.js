const jwt = require('jsonwebtoken');

const secret = "it's a me Mario";

async function createToken(username,res){
    
    const user = {email:username}
    
    const token =  jwt.sign(user, secret);
    await res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
    return;
    

}


async function verifyToken(req){

    const token = req.cookies.jwt;

    if(!token) return 0;

    return jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.log('error ',err)
          return 0
        } else {
          return decoded.email
        }})
}


module.exports = {createToken, verifyToken};
