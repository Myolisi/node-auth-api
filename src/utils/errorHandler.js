import _ from 'lodash';
export function errorHandler(err, req, res, next) {
	console.log(err);
	res.status(err.status || 500).send({
		isError: true,
		message: 'failure',
		error: err.message || 'An unexpected error has occured.',
		status: err.status || 500,
	});
}
