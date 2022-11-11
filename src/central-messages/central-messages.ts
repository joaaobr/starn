import type {ParametersStarn} from '../types/parameters-starn';
import {EventEmitter} from 'events';
import {DataStarn} from '../data.starn';
import net from 'net';
import {SendMessage} from './send-message';
import {GetMessage} from './get-message';

export class CentralMessages {
	private static readonly send: SendMessage = new SendMessage();
	private static readonly get: GetMessage = new GetMessage(
		CentralMessages.send.getEvent(),
	);

	private static readonly data: DataStarn = new DataStarn();
	port: number;
	host?: string;
	socket: net.Server;
	topics: string[];

	constructor(Params: ParametersStarn) {
		this.port = Params.port;
		this.host = Params.host;
		this.topics = Params.topics;

		this.socket = net
			.createServer(async socket => {
				socket.on('data', data => {
					const messages = CentralMessages.data.stringToArray(data);

					for (let i = 0; i < messages.length - 1; i++) {
						const message = CentralMessages.data.parse(messages[i]);

						switch (message.messageSendindType) {
							case 'Validate Topic':
								CentralMessages.send.sendEventMessage({
									topics: this.topics,
								});
								break;

							case 'Send Message':
								CentralMessages.send.sendEventMessage({
									message: message.message,
									time: message.time,
									topic: message.topic,
								});
								break;

							default:
								break;
						}
					}
				});

				await CentralMessages.get.getEventMessage(socket);
			})
			.listen(this.port, this.host);
	}
}
