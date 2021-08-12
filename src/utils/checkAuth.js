import jwt from 'jsonwebtoken';
function auth(req, res, next) {
	try {
		const authorization = req.headers['authorization'];

		if (!authorization) {
			next({ message: 'Not authorized to perform action', status: 401 });
		} else {
			// returns the users details
			const payload = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET);
			req.user = payload;
			console.log(req.user);
			next();
		}
	} catch (error) {
		next({ message: error?.name == 'TokenExpiredError' ? 'Session expired, please login' : 'Unauthorized, please login', status: 401 });
	}
}

export default { auth };
