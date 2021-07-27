const BaseGateway = require('../../common/BaseGateway');
const Validator = require('../../common/Validator');

const TeamListeners = require('./Team.listeners');
const { getHelloSchema } = require('./Team.validations');

const TeamGateway = new BaseGateway('team');

TeamGateway.addListener('join', TeamListeners.join);
TeamGateway.addListener(
    'get-members',
    TeamListeners.getTeamMembers,
).addMiddleware(Validator.checkJoiningTeam);

module.exports = TeamGateway;
