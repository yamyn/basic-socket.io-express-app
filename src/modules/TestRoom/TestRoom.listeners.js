const TestRoomService = require('./TestRoom.service');

class TestRoomListeners {
    getHello(ctx, data) {
        console.log('ctx.socket.id :>> ', ctx.socket.id);
        console.log('ctx.user :>> ', ctx.user);
        console.log('data :>> ', data);

        return TestRoomService.getHello();
    }
}

module.exports = new TestRoomListeners();
