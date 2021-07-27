class TestRoomModel {
    getHello() {
        return new Promise((resolve, reject) => {
            resolve('Hello world!');
        }, 1000);
    }
}

module.exports = new TestRoomModel();
