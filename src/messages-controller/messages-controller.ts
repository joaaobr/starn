import type {ParametersStarn} from '../types/parameters-starn';
import net from 'net';
import {SendMessage} from './events/send-message';
import {GetEventMessage} from './events/get-message';
import {MessageMenager} from './messages/message-manager';

export class MessagesController {
	private static readonly send: SendMessage = new SendMessage();
	private static readonly get: GetEventMessage = new GetEventMessage(
		MessagesController.send.getEvent(),
	);

	messageMenager: MessageMenager;

	port: number;
	host?: string;
	socket: net.Server;

	constructor(Params: ParametersStarn) {
		if (!Params.key) {
			Params.key = 'default';
		}

		this.port = Params.port;
		this.host = Params.host;
		this.messageMenager = new MessageMenager(Params.topics, Params.key);

		this.socket = net
			.createServer(async socket => {
				this.messageMenager.messageMenager(socket);

				await MessagesController.get.getEventMessage(socket);
			})
			.listen(this.port, this.host);
	}
}
