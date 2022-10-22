const mongoose = require('mongoose');
// const {Schema} = mongoose;
const NoteSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	title: {
		type: String,
		required: true,
	},

	description: {
		type: String,
	},
});

//   So far so good. We've got a schema with properties, The next step is compiling our schema into a Model.
const Note = mongoose.model('note', NoteSchema);
// User.createIndexes();
module.exports = Note;
