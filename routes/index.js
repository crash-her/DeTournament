
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.deTournamentTest = function(req, res){
  res.render('deTournamentTest', { title: 'Testing' });
};