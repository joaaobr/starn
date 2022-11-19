import type {Socket} from 'net';
import {ConnectStarn} from '../connect.starn';
import type {Params} from '../types/standard-params';
import {DataStarn} from '../data.starn';

export class Admin {
	private static readonly data: DataStarn = new DataStarn();

	connection: Socket;
	keys: string[] = [];

	constructor(config: Params, key: string) {
		this.connection = new ConnectStarn(config).getConnection();
		this.keys.push(key);
	}

	listTopics(callback: (data?: string[]) => void) {
		this.connection.write(JSON.stringify({
			messageSendindType: 'List Topics',
		}).concat('\n'));

		this.connection.on('data', data => {
			const messagesList = Admin.data.toArray(data);
			for (let i = 0; i < messagesList.length - 1; i++) {
				const message = Admin.data.parse(messagesList[i]);

				if (message.messageSendindType === 'List Topics') {
					callback(message.topics);
				}
			}
		});
	}
}
