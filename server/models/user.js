const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
	username: { type: String, unique: true },
	email: { type: String, unique: true, lowercarse: true },
	password: String
});
// Create model class
const ModelClass = mongoose.model('user', userSchema);
// Export the model
module.exports = ModelClass;