import { exec } from '../utils/queryUtil';

function userByEmail(email) {
	const script = {
		query: `SELECT * FROM users WHERE email = $1`,
		values: [email],
	};
	return exec(script);
}

function saveRefreshToken(refreshToken) {
	const script = {
		query: `INSERT INTO refresh_tokens (refresh_token) VALUES ($1)`,
		values: [refreshToken],
	};
	return exec(script);
}

export default { userByEmail };
