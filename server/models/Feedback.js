var mongoose = require('mongoose'),
  Schema = mongoose.Schema
  ObjectId = Schema.ObjectId;

//database connection
mongoose.connect('mongodb://localhost/feedback');

var AddInfoSchema = new Schema(
{
		name: String
	,	content: String
});


var FeedbackSchema = new Schema({
    message: String
  , url: String
  , dom: {
  			  selector: String
  			, html: String
  		}
  , additional_info: [AddInfoSchema]
});


var Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = mongoose.model('Feedback');
