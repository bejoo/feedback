var mongoose = require('mongoose'),
  Schema = mongoose.Schema
  ObjectId = Schema.ObjectId;

//database connection
mongoose.connect('mongodb://localhost/feedback');

var FeedbackSchema = new Schema({
    message: String
  , url: String
  , dom: String
});


var Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = mongoose.model('Feedback');
