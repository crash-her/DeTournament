$(function(){
    $('#passed').hide();
    $('#passed ul').css('color', 'green');
    $('#failed').hide();
    $('#failed ul').css('color', 'red');

    testBaseFunctions();

    testUndefeted();

    testdefeted();
});

function testBaseFunctions(){
    var passed = [];
    var failed = [];
    var teamArr = [];
    teamArr.push(new Team("mat1"));
    teamArr.push(new Team("mat2"));
    teamArr.push(new Team("mat3"));
    teamArr.push(new Team("mat4"));
    var tourny = new Tournament(teamArr);

    if(tourny.getWinTeams().length === teamArr.length)
        passed.push("getWinTeams");
    else
        failed.push("getWinTeams " + tourny.getWinTeams().length + " != " + teamArr.length);

    if(tourny.getLosTeams().length === 0)
        passed.push("getLosTeams");
    else
        failed.push("getLosTeams " + tourny.getLosTeams().length + " != " + teamArr.length);

    if(tourny.getNumOfRounds() === 1)
        passed.push("getRounds");
    else
        failed.push("getRounds " + tourny.getNumOfRounds() + " != " + 2);

    teamArr.push(new Team("mat5"));
    tourny.addTeam(teamArr[4]);
    if(tourny.getWinTeams().length === teamArr.length)
        passed.push("addTeam");
    else
        failed.push("addTeam " + tourny.getWinTeams().length + " != " + teamArr.length);

    //moving Team 'mat2' to losing team bracket.
    tourny.moveTeamToNextList(teamArr[4]);
    if(tourny.getWinTeams().length === teamArr.length-1 && tourny.getLosTeams().length === 1 )
        passed.push("moveTeamToNextList");
    else
        failed.push("moveTeamToNextList "
                        + tourny.getWinTeams().length + " != " + teamArr.length + " && "
                        + tourny.getLosTeams().length + " != " + 1);

    if( tourny.startTournament() )
        passed.push("startTournament");
    else
        failed.push("startTournament Failed to start tournament!");

    if( passed.length > 0){
        $('#passed').show()
        $.each(passed, function(index, value){
            $('#testPass').append('<li>' + value + '</li>');
        });
    }

    if( failed.length > 0){
        $('#failed').show()
        $.each(failed, function(index, value){
            $('#testFail').append('<li>' + value + '</li>');
        });
    }
}

function testUndefeted(){
    var teamArr = [];
    teamArr.push(new Team("mat1"));
    teamArr.push(new Team("mat2"));
    teamArr.push(new Team("mat3"));
    teamArr.push(new Team("mat4"));
    teamArr.push(new Team("mat5"));
    teamArr.push(new Team("mat6"));
    teamArr.push(new Team("mat7"));
    teamArr.push(new Team("mat8"));
    var tourny = new Tournament(teamArr);

    tourny.startTournament();

    //1
    tourny.setRoundMatchWinner('mat1');
    tourny.setRoundMatchWinner('mat3');
    tourny.setRoundMatchWinner('mat5');
    tourny.setRoundMatchWinner('mat7');

    tourny.startNextRound();

    //Winning bracket 2
    tourny.setRoundMatchWinner('mat1');
    tourny.setRoundMatchWinner('mat5');

    //losing bracket 1
    tourny.setRoundMatchWinner('mat2');
    tourny.setRoundMatchWinner('mat6');

    tourny.startNextRound();

    //Winning bracket 3
    tourny.setRoundMatchWinner('mat1');

    //losing bracket 2
    tourny.setRoundMatchWinner('mat2');
    tourny.setRoundMatchWinner('mat3');

    tourny.startNextRound();

    //losing bracket 3
    tourny.setRoundMatchWinner('mat3');

    tourny.startNextRound();

    //losing bracket 4
    tourny.setRoundMatchWinner('mat5');

    tourny.startNextRound();

    //final match
    tourny.setRoundMatchWinner('mat1');

    //should get alert
    //tourny.startNextRound();

    tourny.printWinRounds("#tournyU");

    tourny.printloseRounds("#tourny2U");

    tourny.printFinalRounds("#finalTournyU");

    $("#tournyU").append("<br><Strong>Winner: " + tourny.getWinnerNameWb() + "</Strong>");

    $("#tourny2U").append("<br><Strong>Winner: " + tourny.getWinnerNameLb() + "</Strong>");

    $("#winnerU").append( "Tournament winner: " + tourny.getTournamentWinner().getName());
}

function testdefeted(){
    var teamArr = [];
    teamArr.push(new Team("mat1"));
    teamArr.push(new Team("mat2"));
    teamArr.push(new Team("mat3"));
    teamArr.push(new Team("mat4"));
    teamArr.push(new Team("mat5"));
    teamArr.push(new Team("mat6"));
    teamArr.push(new Team("mat7"));
    teamArr.push(new Team("mat8"));
    var tourny = new Tournament(teamArr);

    tourny.startTournament();

    //1
    tourny.setRoundMatchWinner('mat1');
    tourny.setRoundMatchWinner('mat3');
    tourny.setRoundMatchWinner('mat5');
    tourny.setRoundMatchWinner('mat7');

    tourny.startNextRound();

    //Winning bracket 2
    tourny.setRoundMatchWinner('mat1');
    tourny.setRoundMatchWinner('mat5');

    //losing bracket 1
    tourny.setRoundMatchWinner('mat2');
    tourny.setRoundMatchWinner('mat6');

    tourny.startNextRound();

    //Winning bracket 3
    tourny.setRoundMatchWinner('mat1');

    //losing bracket 2
    tourny.setRoundMatchWinner('mat2');
    tourny.setRoundMatchWinner('mat3');

    tourny.startNextRound();

    //losing bracket 3
    tourny.setRoundMatchWinner('mat3');

    tourny.startNextRound();

    //losing bracket 4
    tourny.setRoundMatchWinner('mat5');

    tourny.startNextRound();

    //final matchs 1
    tourny.setRoundMatchWinner('mat5');

    tourny.startNextRound();

    //final matchs 2
    tourny.setRoundMatchWinner('mat5');

    //should get alert
    //tourny.startNextRound();

    tourny.printWinRounds("#tourny");

    tourny.printloseRounds("#tourny2");

    tourny.printFinalRounds("#finalTourny");

    $("#tourny").append("<br><Strong>Winner: " + tourny.getWinnerNameWb() + "</Strong>");

    $("#tourny2").append("<br><Strong>Winner: " + tourny.getWinnerNameLb() + "</Strong>");

    $("#winner").append( "Tournament winner: " + tourny.getWinner());//+ tourny.getTournamentWinner().getName());
}