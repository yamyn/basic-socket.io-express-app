const BaseGateway = require('../../common/BaseGateway');
const TestRoomListeners = require('./TestRoom.listeners');

const TestRoomGateway = new BaseGateway('TestRoom');

TestRoomGateway.addListener('hello', TestRoomListeners.getHello);

module.exports = TestRoomGateway;
