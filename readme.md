#Double Elimination Tournament in JavaScript

## Installation Instructions
Just copy the deTournament.js file from public/javascripts to where ever you want to use it.

## To Run code
###In base directory
1. npm install
2. node.exe app.js

note: must have node.js and npm installed first.

##deTournament Classes and Methods
1. Team( TeamName )
2. Tournament(ListOfTeams)
3. Bracket(numberOfRounds, Teams, Tournament)
4. Match(teamA, teamB, Bracket)

## How to use deTournament.js
1. Create an array of Teams.
2. Pass that array to a new Tournament.
3. Start the Tournament. startTournament()
4. Set the winner of the rounds. setRoundMatchWinner(WinnerName)
5. Start next round. startNextRound()
6. repeat steps 4 and 5 until tournament has a winner.

Example:
--Step 1
var teamArr = [];
teamArr.push(new Team("mat1"));
teamArr.push(new Team("mat2"));
teamArr.push(new Team("mat3"));
teamArr.push(new Team("mat4"));
--Step 2
var tourny = new Tournament(teamArr);
--Step 3
tourny.startTournament();
--Step 4
tourny.setRoundMatchWinner('mat1');
tourny.setRoundMatchWinner('mat3');
--Step 5
tourny.startNextRound();

//Winning bracket 2
tourny.setRoundMatchWinner('mat1');
//losing bracket 1
tourny.setRoundMatchWinner('mat2');
--Step 4
tourny.startNextRound();
--Step 5
tourny.setRoundMatchWinner('mat2');
--Step 4
tourny.startNextRound();
--Step 5
tourny.setRoundMatchWinner('mat2');
