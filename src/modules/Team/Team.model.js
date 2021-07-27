class TeamModel {
    getTeamInfo(team_id, user_id) {
        return {};
        // return db /// get team information by team_id and user_id
    }

    getTeamMembers(team_id, user_id) {
        // return db /// get team members infor where team_id and user_id is in members
    }
}

module.exports = new TeamModel();
