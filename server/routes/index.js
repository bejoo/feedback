/*
 * GET home page.
 *
*/
var mongoose = require('mongoose');
var Feedback = require('../models/Feedback');


exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};


exports.feedback_log = function(req, res)
{
	var fb = new Feedback(req.body);
	fb.save();
	console.log(fb);
};