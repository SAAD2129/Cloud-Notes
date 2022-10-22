const jwt = require('jsonwebtoken');
const jwt_sign = 'mynameiskhatarnaakprogrammer@2129';

let fetchUser = (req, res, next) => {
	// Requested user's token will be in the header fetching that one
	let token = req.header('auth-token');
	//if token exist
	if (!token) return res.status(400).json({ error: 'Authentication failed' });
	
	try {
		// verification of token if verified than sending user will be send to request
		let data = jwt.verify(token, jwt_sign);
		req.user = data.user;
		next(); // calling the next authenticating function
	} catch (error) {
		console.log('here');
		return res.status(400).json({ error: 'Internal Error' });
	}
};

module.exports = fetchUser;
