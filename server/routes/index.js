/*
 * GET home page.
 *
*/
var mongoose = require('mongoose');
var Feedback = require('../models/Feedback');


exports.index = function(req, res)
{
//	Feedback.find({}, [], {'group': 'message'}, function (err, feedback) 
	if(!req.params.page)
	{
		to = 10;
		next = 2;
		previous = 0;
	}else
	{
		to = req.params.page * 10;
		next = parseFloat(req.params.page) + 1;
		previous = parseFloat(req.params.page) - 1;
	}
	pagination = {
						next: next 
					,	previous: previous
				}
	
	Feedback.find({}).sort('_id', 1).skip(to - 9).limit(to).execFind( function (err, feedback) 
  	{
  	  res.render('index', 
  	  { 
  	  		title: 'Feedback'
  	  	,	feedbacks: feedback
  	  	,	pagination: pagination
  	  });
	});
};

exports.feedback_log = function(req, res)
{
	var fb = new Feedback(req.body);
	fb.save();
	console.log(fb);
};