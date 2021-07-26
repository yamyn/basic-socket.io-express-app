const TestRoomModel = require('./TestRoom.model');

class TestRoomService {
    getHello() {
        return TestRoomModel.getHello();
    }
}

module.exports = new TestRoomService();
