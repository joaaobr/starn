import type {Params} from './types/standard-params';
import type {Socket} from 'net';
import {createConnection} from 'net';

export class ConnectStarn {
	connection: Socket;

	constructor(connect: Params) {
		this.connection = createConnection({port: connect.port}).on(
			'error',
			err => {
				throw err;
			},
		);
	}

	getConnection(): Socket {
		return this.connection;
	}
}
