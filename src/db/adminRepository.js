import { exec } from '../utils/queryUtil';

function getAllUsers() {
	const script = {
		query: `SELECT name, surname, email, status, date_created,date_modified FROM users`,
	};
	return exec(script);
}

function addUser(name, surname, email, password) {
	const script = {
		query: `INSERT INTO users(name, surname, email, password, status) VALUES($1, $2, $3, $4, 'P')`,
		values: [name, surname, email, password],
	};
	return exec(script);
}

function userByEmail(email) {
	const script = {
		query: `SELECT user_id, name, surname,status, date_created, date_modified email FROM users WHERE email = $1`,
		values: [email],
	};
	return exec(script);
}

export default { addUser, userByEmail, getAllUsers };
