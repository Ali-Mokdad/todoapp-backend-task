const getUser = require('../manageUsers/getUser') 
const bcrypt = require('bcrypt');



async function verifyUser(username,passCode){
    

    userData = await getUser(username)

    if (userData) {
    
    const passwordMatch = await bcrypt.compare(passCode, userData);
    console.log(userData,passwordMatch)
    if (passwordMatch)
        return 1}
    return 0

}

module.exports = verifyUser;
