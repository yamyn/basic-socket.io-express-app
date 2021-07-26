const io = require('socket.io');
const { STATUS_CODES } = require('http');
const redis = require('redis');
const jwt = require('jsonwebtoken');
const createAdapter = require('socket.io-redis');

const CONFIG = require('./config/env');
const TestRoomGateway = require('./modules/TestRoom/TestRoom.gateway');

const redisClient = redis.createClient({
    host: CONFIG.REDIS_HOST,
    port: CONFIG.REDIS_PORT,
});

class Socket {
    init(app) {
        this.server = io(app, {
            ...CONFIG.IO_OPTIONS,
            adapter: createAdapter({
                pubClient: redisClient,
                subClient: redisClient.duplicate(),
            }),
        });

        this.onConnection();
    }

    auth(socket) {
        const { token } = socket.handshake.auth;

        if (token && token.split(' ')[1]) {
            try {
                const user = jwt.verify(token, CONFIG.JWT_SECRET);

                return { user };
            } catch (error) {
                return { error };
            }
        }

        return { error: new Error('Access token not exist!') };
    }

    onConnection() {
        this.server.on('connection', socket => {
            const { error, user } = this.auth(socket);

            if (error) {
                socket.emit('on-auth-error', {
                    message: error.message,
                    statusCode: 401,
                    error: STATUS_CODES[401],
                });

                return socket.disconnect();
            }

            const ctx = {
                server: this.server,
                socket,
                user,
            };

            TestRoomGateway.initListeners(ctx);
        });
    }
}

module.exports = new Socket();
