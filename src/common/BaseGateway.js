const Auth = require('./Auth');
const Exception = require('./Errors/BaseException');
const Validator = require('./Validator');

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

        return {
            validate: schema => {
                this._listeners[event] = async (ctx, data) => {
                    const validatedData = await Validator.validate(
                        schema,
                        data,
                    );

                    return listener(ctx, validatedData);
                };
            },
        };
    }

    initListeners(ctx) {
        Object.keys(this._listeners).forEach(event => {
            ctx.socket.on(this.getEventName(event), async (data, callback) => {
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

    initProtectedListeners({ server, socket }) {
        const { error, user } = Auth.authenticate(socket);

        if (error) {
            socket.emit('on-auth-error', {
                error: new Exception(error.message, 401),
            });

            return socket.disconnect();
        }

        Object.keys(this._listeners).forEach(event => {
            socket.on(this.getEventName(event), async (data, callback) => {
                try {
                    console.log('callback :>> ', callback);
                    console.log('data :>> ', data);
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
