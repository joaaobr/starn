import {Admin} from './admin/admin';
import {CentralMessages} from './central-messages/central-messages';
import {Client} from './client.starn';
import {Sender} from './sender/sender';
import type {ParametersStarn} from './types/parameters-starn';

export class Starn extends CentralMessages {
	port: number;
	host?: string;
	key = 'default';

	constructor(params: ParametersStarn) {
		super(params);
		if (params.key) {
			this.key = params.key;
		}

		this.port = params.port;
		this.host = params.host;
	}

	sender() {
		return new Sender({
			port: this.port,
			host: this.host,
		});
	}

	client() {
		return new Client({
			port: this.port,
			host: this.host,
		});
	}

	admin() {
		return new Admin({port: this.port, host: this.host}, this.key);
	}
}
