class AuthMiddleware {
    static login(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;

        if(!username || !password) {
            res.send({
                status: 500,
                data: "Missing username or password."
            });
            return;
        }
        return next();
    }
}

module.exports = AuthMiddleware;