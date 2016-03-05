var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	forum:String,
	author: String,
	title: String,
	body: String,
	created: {
		type: Date,
		default: Date.now
	},
	tags: Array,
	votes: Number,
	// In the format [{ "text" : "tag1" }, { "text" : "tag2" }]
	answers: [{
		author: String,
		body:String,
		created: {
			type: Date,
			default: Date.now
		}
	}]
});

module.exports = mongoose.model('Post', PostSchema);


