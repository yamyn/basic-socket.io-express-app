const Exception = require('../../common/Errors/BaseException');
const TeamService = require('./Team.service');

class TeamListeners {
    async join(ctx, data) {
        const { team_id } = data;
        const { user, socket } = ctx;

        const team = await TeamService.getTeamInfo(team_id, user.id);
        if (!team) {
            throw new Exception('Team not exist or user not member!', 404);
        }

        if (socket.team_id) {
            socket.leave(socket.team_id);
        }

        socket.join(team_id);
        socket.team_id = team_id;
    }

    getTeamMembers(ctx, data) {
        const { user, socket } = ctx;

        return TeamService.getTeamInfo(socket.team_id, user.id);
    }
}

module.exports = new TeamListeners();
