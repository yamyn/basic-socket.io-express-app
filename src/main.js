const http = require('http');
const express = require('express');
const cors = require('cors');

const CONFIG = require('./config/env');
const events = require('./config/events');
const Socket = require('./Socket');

const app = express();
app.use(cors());
app.options('*', cors());

const httpsServer = http.createServer(app);

events.bind(httpsServer.listen(CONFIG.PORT), CONFIG.PORT);

Socket.init(httpsServer);
