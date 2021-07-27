const Joi = require('joi');

const ValidationException = require('./Errors/ValidationException');
const Exception = require('./Errors/BaseException');

class Validator {
    async validate(schema, data) {
        try {
            const validatedData = await schema.validateAsync(data);

            return validatedData;
        } catch (error) {
            if (Joi.isError(error)) {
                throw new ValidationException(
                    this.parseErrorMessage(error.details),
                );
            }

            throw error;
        }
    }

    parseErrorMessage(details) {
        return details.reduce((acc, detail) => {
            if (acc) acc += ', ';

            acc += detail.message;

            return acc;
        }, '');
    }

    checkJoiningTeam(ctx, data) {
        if (!ctx.socket.team_id) {
            throw new Exception(
                'Not joined any team, please join your room and try after!',
                400,
            );
        }

        return data;
    }
}

module.exports = new Validator();
