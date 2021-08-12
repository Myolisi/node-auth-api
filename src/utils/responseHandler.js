export default function handleResponse(req, res, next) {
	res.ok = (data, status) => {
		res.status(status || 200).send({
			isError: false,
			message: 'success',
			data: data.data,
			status: status || 200,
		});
	};
	next();
}
