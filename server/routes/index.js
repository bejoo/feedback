/*
 * GET home page.
 *
*/
var mongoose = require('mongoose');
var Feedback = require('../models/Feedback');


exports.index = function(req, res)
{
//	Feedback.find({}, [], {'group': 'message'}, function (err, feedback) 
	Feedback.find(function (err, feedback) 
  	{
  	  res.render('index', 
  	  { 
  	  		title: 'Feedback'
  	  	,	feedbacks: feedback
  	  });
	});
};

exports.feedback_log = function(req, res)
{
	var fb = new Feedback(req.body);
	fb.save();
	console.log(fb);
};