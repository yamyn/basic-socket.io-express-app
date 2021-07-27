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

    getEventName(event) {
        return `${this._name}/${event}`;
    }
}

module.exports = BaseGateway;
