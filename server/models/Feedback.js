var mongoose = require('mongoose'),
  Schema = mongoose.Schema
  ObjectId = Schema.ObjectId;

//database connection
mongoose.connect('mongodb://127.0.0.1/feedback');

var AddInfoSchema = new Schema(
{
		name: String
	,	content: String
});


var FeedbackSchema = new Schema({
    message: String
  , url: String
  , DOMObject: {
  			  selector: String
  			, html: String
  		}
  , additional_info: [AddInfoSchema]
});

var Feedback = mongoose.model('Feedback', FeedbackSchema);
	
			
//methods
Feedback.getPagination = function (page) 
{
	
	if(!page)
	{
		//set default values for pagination
		to = 10;
		next = 2;
		previous = 0;
	}else
	{
		to = page * 10;
		next = parseFloat(page) + 1;
		previous = parseFloat(page) - 1;
	}
  Feedback.count(function(err, count) 
  { 
  		maxCount = Math.ceil(count / 10);
  });
  
  paginationObj = {
						next: next 
					,	previous: previous
					,	max: maxCount
				}
  return paginationObj;
}


module.exports = mongoose.model('Feedback');
