/*
 * GET home page.
 *
*/
var mongoose = require('mongoose');
var Feedback = require('../models/Feedback');


exports.index = function(req, res)
{
//	Feedback.find({}, [], {'group': 'message'}, function (err, feedback) 
	var paginationObj = Feedback.getPagination(req.params.page);
	console.log(paginationObj);
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
};