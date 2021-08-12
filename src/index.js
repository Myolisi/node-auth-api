import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import appRoutes from './appRoutes';
import { errorHandler } from './utils/errorHandler';
import { pool } from './utils/queryUtil';
import handleResponse from './utils/responseHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cookieParser());
app.use(handleResponse);
app.use('/api', appRoutes);

app.use(
	cors({
		credentials: true,
		origin: process.env.URL || '*', // front-end to accept else all if public api
	})
);

app.use((req, res, next) => {
	const error = new Error('Route not found');
	error.status = 404;
	next(error);
});
app.use(errorHandler);
pool.connect((err, client, release, callback) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Database conencted:: ${client?.database}`);
	}
});

app.listen(port, () => {
	console.log('Server is running on ' + port);
});
