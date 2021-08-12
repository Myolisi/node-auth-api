import validator from 'validator';

export function isEmail(email) {
	return validator.isEmail(email);
}
