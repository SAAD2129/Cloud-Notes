const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});
//   So far so good. We've got a schema with property, The next step is compiling our schema into a Model.
const User = mongoose.model('user', UserSchema);
// to make a unique entry of user
// User.createIndexes();
module.exports = User;
