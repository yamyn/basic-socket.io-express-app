const Auth = require('./Auth');

class BaseGateway {
    static _instances = {};

    constructor(name) {
        if (BaseGateway._instances[name]) return BaseGateway._instances[name];

        this._name = name;
        this._listeners = {};

        BaseGateway._instances[name] = this;
    }

    addListener(event, listener) {
        this._listeners[event] = listener;
    }

    initListeners(ctx) {
        Object.keys(this._listeners).forEach(event => {
            ctx.socket.on(this.getEventName(event), async (callback, data) => {
                try {
                    const res = await this._listeners[event](ctx, data);

                    callback({ data: res });
                } catch (error) {
                    // can add interceptor in feature
                    if (error.statusCode === 500) {
                        // TODO add loger
                        console.log(error);
                    }

                    callback({ error });
                }
            });
        });
    }

    initProtectedListeners({ server, socket }, role) {
        const { error, user } = Auth.authenticate(socket);
        console.log('this.role :>> ', role);

        if (error) {
            socket.emit('on-auth-error', {
                error: {
                    message: error.message,
                    statusCode: 401,
                    error: STATUS_CODES[401],
                },
            });

            return socket.disconnect();
        }

        Object.keys(this._listeners).forEach(event => {
            socket.on(this.getEventName(event), async (callback, data) => {
                try {
                    const res = await this._listeners[event](
                        { server, user, socket },
                        data,
                    );

                    callback({ data: res });
                } catch (error) {
                    // can add interceptor in feature
                    if (error.statusCode === 500) {
                        // TODO add loger
                        console.log(error);
                    }

                    callback({ error });
                }
            });
        });
    }

    getEventName(event) {
        return `${this._name}/${event}`;
    }
}

module.exports = BaseGateway;
