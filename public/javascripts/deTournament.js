//Region Tournament Tested
function Tournament(_teams){
    this.numOfTeams = _teams.length;
    //Doing this so that the passed in array won't be modified. AKA getting rid of side effects. No one likes side effects NO ONE!!
    this.winTeams = _teams.slice();
    this.losTeams = [];
    this.tournamentStarted = false;
    this.currentRound = 0;

    this.winBracket = new Bracket(this.getNumOfRounds(), this.winTeams, this);
    this.loseBracket = new Bracket(this.getNumOfRounds()+1, this.losTeams, this);

    this.finalMatch1 = new Match(null, null, this);
    this.finalMatch2 = new Match(null, null, this);

    this.winner = null;

    this.lastRound = false;
}

Tournament.prototype.moveTeamToNextList = function(teamObj){
        var index = this.winTeams.indexOf(teamObj);
        if( index != -1){
            //Remove the team from the wining bracket and put it in to the losing bracket
            this.winTeams.splice(index, 1);
            this.loseBracket.addTeam(teamObj);//because of side effects add the teamObj here will also add it to lowTeams
            //this.losTeams.push(teamObj);
        } else {
            //Remove the team form the losing bracket.
            index = this.losTeams.indexOf(teamObj);
            if( index != -1)
                this.losTeams.splice(index, 1);
        }
    };

Tournament.prototype.startTournament = function(){
    if( !this.lastRound ){
        if( this.tournamentStarted)
            this.currentRound++;

        if( !this.tournamentStarted )
            this.tournamentStarted = this.winBracket.createRound(this.currentRound);
        else{
            //going to start next round we are nice like that.
            this.tournamentStarted = this.winBracket.createRound(this.currentRound);
            this.tournamentStarted = this.loseBracket.createRound(this.currentRound-1);

            if( !this.tournamentStarted){
                this.lastRound = true;
            }
        }
    }

    return this.tournamentStarted;
};

Tournament.prototype.startNextRound = function(){
    if( this.isTournamentFinished() )
        alert("Tournament Finished! Winner: " + this.getTournamentWinner().getName() );
    else
        this.startTournament();
};

Tournament.prototype.setRoundMatchWinner = function(teamName){
    if( !this.isTournamentFinished() ){
        var teamIndex = -1;
        var inWin = false;
        for( var i = 0; i < this.winTeams.length && teamIndex === -1; i++)
            if( this.winTeams[i].getName() === teamName ) {
                teamIndex = i;
                inWin = true;
                //this.winBracket.setWinner(this.currentRound, this.winTeams[i]);
            }

        if( teamIndex === -1 )
            for( var i = 0; i < this.losTeams.length && teamIndex === -1; i++)
                if( this.losTeams[i].getName() === teamName ) {
                    teamIndex = i;
                    //this.loseBracket.setWinner(this.currentRound-1, this.losTeams[i]);
                }

        if( !this.lastRound && teamIndex != -1){
            if( inWin ) this.winBracket.setWinner(this.currentRound, this.winTeams[teamIndex]);
            else this.loseBracket.setWinner(this.currentRound-1, this.losTeams[teamIndex]);
        } else if( teamIndex != -1 ) {
            if( this.winTeams.length > 0){
                this.finalMatch1.setTeamA(this.winTeams[teamIndex]);
                this.finalMatch1.setTeamB(this.losTeams[0]);
            } else {
                this.finalMatch2.setTeamA(this.losTeams[0]);
                this.finalMatch2.setTeamB(this.losTeams[1]);
            }

            if( inWin ) {
                this.winner = this.winTeams[teamIndex];
                this.finalMatch1.setWinner(this.winTeams[teamIndex]);
            } else {
                if( this.winTeams.length > 0)
                    this.moveTeamToNextList(this.winTeams[0]);
                else if( teamIndex == 0)
                    this.moveTeamToNextList(this.losTeams[1]);
                else
                    this.moveTeamToNextList(this.losTeams[0]);

                this.finalMatch2.setWinner(this.losTeams[teamIndex]);
            }

            if( this.losTeams.length == 1 && !inWin ) this.winner = this.losTeams[teamIndex];
        }
    } else {
        alert("Tournament Finished! Winner: " + this.getTournamentWinner().getName() );
    }
};

Tournament.prototype.getTournamentWinner = function(){
    return this.winner;
}

Tournament.prototype.isTournamentFinished = function(){
    return this.winner != null;
}

Tournament.prototype.addTeam = function(teamObj){
    if( !this.tournamentStarted ) {
        //this.winTeams.push(teamObj);
        this.winBracket.addTeam(teamObj);
    }
};

Tournament.prototype.getWinTeams = function(){
    return this.winTeams;
};

Tournament.prototype.getLosTeams = function(){
    return this.losTeams;
};

Tournament.prototype.getNumOfRounds = function(){
    return (Math.ceil(Math.log(this.numOfTeams)/Math.log(2)) - 1);
};

Tournament.prototype.printWinRounds = function(htmlId){
    this.printBracket(htmlId, true);
};

Tournament.prototype.printloseRounds = function(htmlId){
    this.printBracket(htmlId, false);
};

Tournament.prototype.printFinalRounds = function(htmlId){
    var table = "<table>";

    table += '<th>Round 0</th>'
    table += "<tr>";
    table += "<td>Match 0: "  + this.finalMatch1.getTeamA().getName() + " vs " + this.finalMatch1.getTeamB().getName() + "</td>";
    table += "</tr>";

    if( this.finalMatch2.getWinner() != null){
        table += '<th>Round 1</th>'
        table += "<tr>";
        table += "<td>Match 1: "  + this.finalMatch2.getTeamA().getName() + " vs " + this.finalMatch2.getTeamB().getName() + "</td>";
        table += "</tr>";
    }

    table += "</table>";

    $(htmlId).append(table);
};

Tournament.prototype.printBracket = function(htmlId, winBracket){
    var rounds = this.winBracket.getRounds();

    if( !winBracket ) rounds = this.loseBracket.getRounds();

    var table = "<table>";
    for(var i = 0; i < rounds.length; i++){
        var matches = rounds[i];
        table += '<th>Round ' + i + '</th>'
        for( var j = 0; j < matches.length; j++){
            var match = matches[j];
            table += "<tr>";
            table += "<td>Match " + j + ": "  + match.getTeamA().getName() + " vs " + match.getTeamB().getName() + "</td>";
            table += "</tr>";
        }

    }

    table += "</table>";

    $(htmlId).append(table);
};

Tournament.prototype.printTeams = function(htmlId){
    var table = "<table>";

    table += "<th><td>Winner</td></th>";

    for(var i = 0; i < this.winTeams.length; i++)
        table += "<tr><td>" + this.winTeams[i].getName() + "</td></tr>";

    table += "<th><td>Loosers</td></th>";

    for(var i = 0; i < this.losTeams.length; i++)
        table += "<tr><td>" + this.losTeams[i].getName() + "</td></tr>";

    table += "</table>";

    $(htmlId).append(table);
};

Tournament.prototype.getWinnerNameWb = function(){
    var winner = this.winBracket.getWinner();

    return winner != null ? winner.getName() : "";
};

Tournament.prototype.getWinnerNameLb = function(){
    var winner = this.loseBracket.getWinner();

    return winner != null ? winner.getName() : "";
};

Tournament.prototype.getWinner = function(){
    return this.finalMatch2.getWinner().getName();
};
//End Tournament Region

//Region Bracket
function Bracket(_numRounds, _teams, _parentObj){
    this.rounds = [];//List of lists of matches
    this.teams = _teams;//.slice();
    this.numRounds = _numRounds;
    this.parentObj = _parentObj;
}

Bracket.prototype.addTeam = function(teamObj){
        this.teams.push(teamObj);
    };

Bracket.prototype.removeTeamFromBracket = function(teamObj){
    this.parentObj.moveTeamToNextList(teamObj);
};

Bracket.prototype.createRound = function( roundNum ){
    if( roundNum <= this.numRounds){
        var matches = [];
        var passTeamIndex = -1;

        if( this.teams.length % 2 != 0) {
            passTeamIndex = this.determinePassIndex();
        }

        var teamAb = [];
        for(var i = 0; i < this.teams.length; i++){
            var team = this.teams[i];
            if( passTeamIndex != i){
                teamAb.push(team);
                if( teamAb.length === 2){
                    matches.push( new Match(teamAb[0], teamAb[1], this));
                    teamAb.length = 0; //Apprently you do this to clear/empty array so you don't have to create a new array in memory space.
                }
            } else {
                team.matchNumber = -1;
            }
        }

        this.rounds[roundNum] = matches;
    } else {
        //We should not be creating any more rounds
        return false;
    }

    return !this.isRoundOver(roundNum);
};

Bracket.prototype.getRounds = function(){
  return this.rounds;
};

Bracket.prototype.determinePassIndex = function(){
    var passTeamIndex = -1;
    var lastIndex = this.teams.length-1;

    //determine if any team got a pass last round.
    for(var i=0; i < this.teams.length; i++){
        var team = this.teams[i];

        if( team.matchNumber === -1 )
            passTeamIndex = i;
    }

    //If their was no pass last round then we will give the pass to the last team.
    if( passTeamIndex == -1)
        passTeamIndex = lastIndex;
    else { //If there was a pass last round we will give the pass to the next team in line.
        // If we passed the last team we will give the pass to the first team.
        if( passTeamIndex === lastIndex ) passTeamIndex = 0;
        else passTeamIndex += 1;
    }

    return passTeamIndex;
}

Bracket.prototype.isRoundOver = function(roundNum){
    var matches = this.rounds[roundNum];
    var isRoundOver = !(matches.length != 0);

    for(var i=0; i < matches.length && !isRoundOver; i++){
        isRoundOver = matches[i].getWinner() != null;
    }

    return isRoundOver;
};

Bracket.prototype.setWinner = function(roundIndex, team){
    var foundTeam = false;
    var matches = this.rounds[roundIndex];
    for(var i = 0; i < matches.length && !foundTeam; i++){
        var match = matches[i];
        if(match.getTeamA() === team || match.getTeamB() === team){
            foundTeam = true;
            match.setWinner(team);
            if(match.getTeamA() === team)
                this.removeTeamFromBracket(match.getTeamB());
            else
                this.removeTeamFromBracket(match.getTeamA());
        }
    }
};

Bracket.prototype.getWinner = function(){
    return this.rounds[this.numRounds][0].getWinner();
};
//End Bracket Region

//Region Match
function Match(_teamA, _teamB, parentObj){
    this.winner = null;
    this.teamA = _teamA;
    this.teamB = _teamB;
}

Match.prototype.setWinner = function(teamObj){
        this.winner = teamObj;
    };

Match.prototype.getWinner = function(){
        return this.winner;
    };

Match.prototype.getTeamA = function(){
        return this.teamA;
    };

Match.prototype.setTeamA = function(_team){
        this.teamA = _team;
    };

Match.prototype.getTeamB = function(){
        return this.teamB;
    };

Match.prototype.setTeamB = function(_team){
        this.teamB = _team;
    };
//End Match Region

//Region Team
function Team(_name){
    this.name = _name;
    this.points = 0;
    this.matchNumber = 0;
}

Team.prototype.addPoints = function(points){
        this.points += points;
    };

Team.prototype.getPoints = function(){
        return this.points;
    };

Team.prototype.setMatchNum = function(num){
        this.matchNumber = num;
    };

Team.prototype.getMatchNum = function(){
        return this.matchNumber;
    }

Team.prototype.getName = function(){
        return this.name;
    }
//End Team Region