import encryUtil from '../../utils/encryUtil';
import adminRepository from '../../db/adminRepository';

async function getAll(req, res, next) {
	try {
		const users = await adminRepository.getAllUsers();
		res.ok({ data: users.rows });
	} catch (error) {
		next({ error: error, status: 500 });
	}
}

function getById(req, res, next) {
	console.log('getting one');
	res.ok('getOne');
}

async function add(req, res, next) {
	try {
		const { name, surname, email, password } = req.body;
		const hashedPassword = await encryUtil.hashPassword(password);

		// add new user to the database
		await adminRepository.addUser(name, surname, email, hashedPassword);
		res.ok({ data: 'User created successfully' });
	} catch (error) {
		next(error);
	}
}

export default { getAll, getById, add };
