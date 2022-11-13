import type {ParametersStarn} from '../types/parameters-starn';
import {EventEmitter} from 'events';
import {DataStarn} from '../data.starn';
import net from 'net';
import {SendMessage} from './send-message';
import {GetMessage} from './get-message';
import {MessageMenager} from './message-manager';

export class CentralMessages {
	private static readonly send: SendMessage = new SendMessage();
	private static readonly get: GetMessage = new GetMessage(
		CentralMessages.send.getEvent(),
	);

	private static readonly data: DataStarn = new DataStarn();
	private static readonly messageMenager: MessageMenager = new MessageMenager();

	port: number;
	host?: string;
	socket: net.Server;
	topics: string[];

	constructor(Params: ParametersStarn) {
		this.port = Params.port;
		this.host = Params.host;
		this.topics = Params.topics;
		CentralMessages.messageMenager.setTopics(this.topics);

		this.socket = net
			.createServer(async socket => {
				CentralMessages.messageMenager.messageMenager(socket);

				await CentralMessages.get.getEventMessage(socket);
			})
			.listen(this.port, this.host);
	}
}
