const BaseGateway = require('../../common/BaseGateway');
const TestRoomListeners = require('./TestRoom.listeners');
const { getHelloSchema } = require('./TestRoom.validation');

const TestRoomGateway = new BaseGateway('TestRoom');

TestRoomGateway.addListener('hello', TestRoomListeners.getHello).validate(
    getHelloSchema,
);

module.exports = TestRoomGateway;
