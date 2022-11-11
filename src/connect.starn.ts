import type {ParametersConnectionStarn} from './interfaces.starn';
import type {Socket} from 'net';
import {createConnection} from 'net';

export class ConnectStarn {
	connection: Socket;

	constructor(connect: ParametersConnectionStarn) {
		this.connection = createConnection({port: connect.port})
			.on('error', err => {
				throw err;
			});
	}

	connect(): Socket {
		return this.connection;
	}
}
