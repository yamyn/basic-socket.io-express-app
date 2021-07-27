const TeamModel = require('./Team.model');

class TestRoomService {
    getTeamInfo(team_id, user_id) {
        return this.TeamModel.getTeamInfo(team_id, user_id);
    }

    getTeamMembers(team_id, user_id) {
        return this.TeamModel.getTeamMembers(team_id, user_id);
    }
}

module.exports = new TestRoomService();
