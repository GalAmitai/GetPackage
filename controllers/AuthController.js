const AuthService = require("../services/AuthService");

class AuthController {

    static async verifyAuthentication(req) {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const Auth = await AuthService.verifyAuthentication(username, password);
            
            if(Auth) {
                return {
                    status: 200,
                    data: {
                        token: Auth.token,
                        user: Auth.user
                    }
                }
            } else {
                return {
                    status: 401,
                    data: "Unauthenticated."
                }
            }
            
        } catch (err) {
            throw err;
        }
    }

}

module.exports = AuthController;