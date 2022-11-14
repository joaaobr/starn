import type {ParametersStarn} from '../types/parameters-starn';
import {DataStarn} from '../data.starn';
import net from 'net';
import {SendMessage} from './events/send-message';
import {GetEventMessage} from './events/get-message';
import {MessageMenager} from './message-manager';

export class CentralMessages {
	private static readonly send: SendMessage = new SendMessage();
	private static readonly get: GetEventMessage = new GetEventMessage(
		CentralMessages.send.getEvent(),
	);

	private static readonly data: DataStarn = new DataStarn();
	messageMenager: MessageMenager;

	port: number;
	host?: string;
	socket: net.Server;

	constructor(Params: ParametersStarn) {
		this.port = Params.port;
		this.host = Params.host;
		this.messageMenager = new MessageMenager(Params.topics);

		this.socket = net
			.createServer(async socket => {
				this.messageMenager.messageMenager(socket);

				await CentralMessages.get.getEventMessage(socket);
			})
			.listen(this.port, this.host);
	}
}
