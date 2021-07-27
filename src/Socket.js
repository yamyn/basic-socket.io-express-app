const io = require('socket.io');

const redis = require('redis');

const createAdapter = require('socket.io-redis');

const CONFIG = require('./config/env');
const TestRoomGateway = require('./modules/TestRoom/TestRoom.gateway');
const TeamGateway = require('./modules/Team/Team.gateway');

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

    onConnection() {
        this.server.on('connection', socket => {
            const ctx = {
                server: this.server,
                socket,
            };

            TestRoomGateway.initProtectedListeners(ctx);
            TeamGateway.initProtectedListeners(ctx);
        });
    }
}

module.exports = new Socket();
