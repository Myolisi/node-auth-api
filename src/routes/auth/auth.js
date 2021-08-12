import authRepository from '../../db/authRepository';
import encryptUtil from '../../utils/encryUtil';
import handleAuth from '../../utils/handleAuth';
import { isEmail } from '../../utils/validators';

async function login(req, res, next) {
	try {
		const { email, password } = req.body;

		// check if email is valid
		if (!isEmail(email)) {
			next({ message: 'Invalid email provided', status: 400 });
		} else {
			// else authenticate the user
			const user = await authRepository.userByEmail(email);

			if (user.rows.length == 0) {
				return next({ error: 'User with email does not exist', status: 404 });
			} else if (user.rows.length) {
				const userLoggedIn = user.rows[0];

				const isValidLogin = encryptUtil.comparePassword(password, userLoggedIn.password);
				if (!isValidLogin) {
					next({ message: 'Password incorrect', status: 401 });
				} else {
					// We dont want to include the password in the token, its hashed but na
					delete userLoggedIn.password;
					const userToken = await handleAuth.generateToken(userLoggedIn);
					res.cookie('refresh_token', userToken.refreshToken, { httpOnly: true });
					res.ok({ data: { tokens: userToken }, status: 200 });
				}
			}
		}
	} catch (error) {
		next(error);
	}
}

async function refreshToken(req, res, next) {
	try {
		const payload = await handleAuth.verifyRefresheToken(req, next);
		console.log(payload);
		if (payload) {
			// remove current durations
			delete payload.iat;
			delete payload.exp;

			// generate new token
			const userToken = await handleAuth.generateToken(payload);
			res.cookie('refresh_token', userToken.refreshToken, { httpOnly: true });
			res.ok({ data: { tokens: userToken }, status: 200 });
		}
	} catch (error) {
		next(error);
	}
}

export default { login, refreshToken };
