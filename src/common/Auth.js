const jwt = require('jsonwebtoken');
const { STATUS_CODES } = require('http');

const CONFIG = require('../config/env');

class Auth {
    parseAccessToken(socket) {
        const { token } = socket.handshake.auth;
        if (token) {
            return token.split(' ')[1];
        }

        return null;
    }

    authenticate(socket) {
        const token = this.parseAccessToken(socket);

        if (token) {
            try {
                const user = jwt.verify(token, CONFIG.JWT_SECRET);

                return { user };
            } catch (error) {
                return { error };
            }
        }

        return { error: new Error('Access token not exist!') };
    }
}

module.exports = new Auth();
