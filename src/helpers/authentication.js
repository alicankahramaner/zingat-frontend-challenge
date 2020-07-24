const users = require('../../dummyDB.json').users;

class Authentication {
    sessions = [];

    login(req, res) {
        let data = req.body;

        let user = users.find(u => u.username === data.username && u.password === data.password);

        if (!user) {
            this.toLogin(res);
            return false;
        }

        let sessionKey = this.createSession(user);
        res.cookie('session', sessionKey);
        return true;
    }

    createSession(user) {
        let sessionKey = this.randomStringGenerator();
        this.sessions.push({
            username: user.username,
            sessionKey: sessionKey
        });

        return sessionKey;
    }

    randomStringGenerator() {
        return Math.random().toString(20).substr(2, 5);
    }

    logout(req, res) {
        if (session === null) {
            return false;
        }

        res.cookie('session', '');
        res.redirect('/login');
    }

    toLogin(res) {
        res.statusCode = 301;
        res.redirect('/login');
        return;
    }

    authControl(req) {
        let isAuth = false;

        if (!isAuth && req.cookies['session']) {
            let activeSession = this.sessions.find(s => s.sessionKey)

            if (activeSession) {
                isAuth = true;
            }
        }

        return isAuth;
    }

    checkAuth(req, res, next) {
        if (!this.authControl(req)) {
            this.toLogin(res);
            return;
        }

        next();
    }
}

module.exports = new Authentication();