const md5 = require('md5');
const jwt = require('jsonwebtoken');
const UserModel = require('./../models/User');
const config = require('./../configuration/config');
const Logger = require('./../utils/Logger');

class AuthService {

    static async verifyAuthentication(username, password) {
        // Use Usermodel to check user in DB
        try {
            const user = await UserModel.findOne({ username: username, password: md5(password) }).exec();
            if(user) {
                let doc = user._doc;
                let token = jwt.sign({ doc }, config.jwt.key);
                return {
                    token: token,
                    user: {
                        id: user.id,
                        username: user.username,
                        type: user.type
                    }
                }
            }
            return null;
        } catch(err) {
            Logger.log(err);
        }
    }

}

module.exports = AuthService;