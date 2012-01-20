/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};


exports.feedback_log = function(req, res)
{
	console.log(req);
	
};