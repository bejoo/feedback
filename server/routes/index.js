/*
 * GET home page.
 *
*/
var mongoose = require('mongoose');
var Feedback = require('../models/Feedback');
var users = require('../users.js');


exports.index = function(req, res)
{
//	Feedback.find({}, [], {'group': 'message'}, function (err, feedback) 
	
	var paginationObj = Feedback.getPagination(req.params.page);
	Feedback.find({}).sort('_id', 1).skip(to - 9).limit(to).execFind( function (err, feedback) 
  	{
  	  res.render('index', 
  	  { 
  	  		title: 'Feedback'
  	  	,	feedbacks: feedback
  	  	,	pagination: paginationObj
  	  });
	});
};

exports.feedback_log = function(req, res)
{
	var fb = new Feedback(req.body);
	fb.save();
	console.log(fb);
};

exports.sessions_new = function(req, res)
{
	res.render('sessions/new', {locals: {redir: req.query.redir}, title: 'Login'});
};

exports.sessions_auth = function(req, res)
{
	users.authenticate(req.body.login, req.body.password, function(user)
	{
		if(user)
		{
			req.session.user = user;
			res.redirect(req.body.redir || '/');
		}else
		{
			req.flash('warn', 'Login failed. Please try again.');
			res.render('sessions/new', {locals: {redir: req.body.redir}, title: 'Login'});
		}
	});
};

exports.sessions_destroy = function(req, res) {
  delete req.session.user;
  res.redirect('/sessions/new');
};