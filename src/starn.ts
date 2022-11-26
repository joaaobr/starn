import {Admin} from './admin/admin';
import {MessagesController} from './messages-controller/messages-controller';
import {Client} from './client';
import {Sender} from './sender/sender';
import type {ParametersStarn} from './types/parameters-starn';

export class Starn extends MessagesController {
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
