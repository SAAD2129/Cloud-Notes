const express = require('express');
const router = express.Router();
// Exported User Schema to create users
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const jwt_sign = 'mynameiskhatarnaakprogrammer@2129';

router.post(
	'/register',
	[
		// validating the pass,name & email
		body('name', 'minimum length should be 3 characters').isLength({ min: 3 }),
		body('email', 'it must be a valid email').isEmail(),
		body('password', 'Password must be 6 characters').isLength({ min: 6 }),
	],

	async (req, res) => {
		// if errors in validation then user will be redirected to that errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).json({ errors: errors.array() });
		}
		try {
			// searching if user already exist in DB W8ing till the user found or not
			let user = await User.findOne({ email: req.body.email });
			// if User Already exist
			if (user) return res.status(400).json({ error: 'Wrong Credentials' });

			//securing the password / salting the password
			const salt = await bcrypt.genSalt(10);
			const secPass = await bcrypt.hash(req.body.password, salt);

			// w8ing for findOne() to create a user
			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: secPass,
			});

			const data = {
				user: {
					id: user.id,
				},
			};
			const token = jwt.sign(data, jwt_sign);
			res.json({ token, user });
		} catch (error) {
			res.json({ error: 'Internal Error Occured' });
		}
	},
);

router.post(
	'/login',
	[
		// validating the email & checking if password exist
		body('email', 'it must be a valid email').isEmail(),
		body('password', 'Please enter Password').exists(),
	],

	async (req, res) => {
		// if errors in validation then user will be redirect to that errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).json({ errors: errors.array() });
		}
		// Destructuring/Extracting the email & password form body
		const { email, password } = req.body;
		try {
			// searching if user exist in DB W8ing till the user found or not
			let user = await User.findOne({ email: email });
			
			//return if user doesn't exist
			if (!user) return res.status(400).json({ error: 'In correct email or password' });

			// matching password with hashed & salted password in DB
			const isPassCorrect = await bcrypt.compare(password, user.password);
			// if password is not correct return simply
			if (!isPassCorrect) {
				return res.status(400).json({ error: 'In correct password ' });
			}
			// else givegin the token to user Accord his id
			const data = {
				user: {
					id: user.id,
				},
			};
			const token = jwt.sign(data, jwt_sign);
			res.json({ token });
		} catch (error) {
			// if Error Cached user will be directed to that one
			res.status(500).send('Some error Occured try again');
		}
	},
);

module.exports = router;

router.post('/giveuser', fetchuser, async (req, res) => {
	try {
		let userId = req.user.id;
		const user = await User.findById(userId).select('-password');
		res.json(user);
	} catch (error) {
		return res.status(400).json({ error: 'Internal Error in authentication' });
	}
});
