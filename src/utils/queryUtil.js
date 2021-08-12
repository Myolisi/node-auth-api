import { Pool } from 'pg';

// might wanna store this in a config file
const config = {
	user: 'postgres',
	password: 'postgres',
	host: 'localhost',
	port: 5432,
	database: 'task_management',
};
export const pool = new Pool(config);

export const exec = (sql) => {
	return pool.query(sql.query, sql.values);
};
