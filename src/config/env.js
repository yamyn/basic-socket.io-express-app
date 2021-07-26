const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    IO_OPTIONS: {
        origins: '*:*',
        cors: {
            origin: 'localhost:3000/',
            methods: '["GET", "POST"]',
            credentials: true,
            maxHttpBufferSize: 1e8,
        },
    },
    JWT_SECRET: process.env.JWT_SECRET || 'access_secret',

    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
};
