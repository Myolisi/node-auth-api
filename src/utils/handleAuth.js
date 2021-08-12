import jwt from 'jsonwebtoken';

function generateToken(user) {
	const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '20s' });
	const refreshToken = jwt.sign(user, process.env.JWT_REFRESH, { expiresIn: '20s' });

	return { accessToken, refreshToken };
}

async function verifyRefresheToken(req, next) {
	try {
		return await jwt.verify(req.cookies.refresh_token, process.env.JWT_REFRESH);
	} catch (err) {
		next({ message: err?.name == 'TokenExpiredError' ? 'Token expired' : 'Not authorized to perform action', status: 401 });
	}
}

export default { generateToken, verifyRefresheToken };
