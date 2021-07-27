const BaseGateway = require('../../common/BaseGateway');
const Validator = require('../../common/Validator');

const TestRoomListeners = require('./TestRoom.listeners');
const { getHelloSchema } = require('./TestRoom.validations');

const TestRoomGateway = new BaseGateway('TestRoom');

TestRoomGateway.addListener('hello', TestRoomListeners.getHello)
    .validate(getHelloSchema)
    .addMiddleware(Validator.checkJoiningTeam);

module.exports = TestRoomGateway;
