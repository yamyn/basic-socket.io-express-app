const TeamModel = require('./Team.model');

class TeamService {
    getTeamInfo(team_id, user_id) {
        return TeamModel.getTeamInfo(team_id, user_id);
    }

    getTeamMembers(team_id, user_id) {
        return TeamModel.getTeamMembers(team_id, user_id);
    }
}

module.exports = new TeamService();
