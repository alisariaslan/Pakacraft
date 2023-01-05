const moment = require('moment/moment');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect('mongodb://localhost:27017/battleground');

	const userSchema = new mongoose.Schema({
		username: String,
		gamename: String,
		password: String,
		email: String,
		emailVerified: Boolean,
		phone: Number,
		countryCoe: Number,
		registerDate: Date,
	});

	// NOTE: methods must be added to the schema before compiling it with mongoose.model()
	userSchema.methods.speak = function speak() {
		/* const greeting = this.username
			? "My username is " + this.username //if have username
			: "I have no username";			 */	//if not

		const greeting = 
		this.username + "\n" +
		this.email + "\n" +
		this.phone;
		console.log(greeting);
	};

	const User = mongoose.model('User', userSchema); //method will be in the up segment /\

	const user = new User({
		username: 'acsayear', //if null then it will log -> 'I have no username'
		gamename: 'Pakachu',
		password: 'a5134ba8',
		email: 'acsayear@gmail.com',
		emailVerified: false,
		phone: 5374639493,
		countryCoe: 90,
		registerDate: moment().format()
	}); 

	await user.save();
	user.speak();

	await User.find({ username: /^acsayear/ });
	// use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}