/* eslint-disable @typescript-eslint/parameter-properties */
import type {Socket} from 'net';
import {Connection} from '../connection';
import type {Params} from '../types/standard-params';
import {Data} from '../data';
import {KeyErros} from '../errors/key.erros';
import crypto from 'crypto';

export class Admin {
	private static readonly data: Data = new Data();
	connection: Socket;
	key: string;

	constructor(config: Params, key: string) {
		this.key = key;
		this.connection = new Connection(config).getConnection();

		this.connection.write(
			JSON.stringify({
				messageSendindType: 'Validate Key',
				message: key,
			}).concat('\n'),
		);

		this.connection.on('data', data => {
			const messagesList = Admin.data.toArray(data);
			for (let i = 0; i < messagesList.length - 1; i++) {
				const message = Admin.data.parse(messagesList[i]);

				if (message.messageSendindType === 'Validate Key') {
					if (!message.message) {
						return new KeyErros(this.key);
					}
				}
			}
		});
	}

	listTopics(callback: (data?: string[]) => void) {
		const id = crypto.randomBytes(9).toString('hex');
		this.connection.write(
			JSON.stringify({
				messageSendindType: 'Get Topics',
				id,
			}).concat('\n'),
		);

		this.connection.on('data', data => {
			const messagesList = Admin.data.toArray(data);

			for (let i = 0; i < messagesList.length - 1; i++) {
				const message = Admin.data.parse(messagesList[i]);

				if (message.id === id) {
					callback(message.topics);
				}
			}
		});
	}

	createTopic(topic: string) {
		this.connection.write(
			JSON.stringify({
				messageSendindType: 'Create Topic',
				topic,
			}).concat('\n'),
		);
	}

	removeTopic(topic: string) {
		this.connection.write(
			JSON.stringify({
				messageSendindType: 'Remove Topic',
				topic,
			}).concat('\n'),
		);
	}
}
