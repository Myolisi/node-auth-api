import bcrypt from 'bcrypt';

function hashPassword(password) {
	return bcrypt.hash(password, 10);
}

function comparePassword(password, hash) {
	return bcrypt.compareSync(password, hash);
}

export default { hashPassword, comparePassword };
