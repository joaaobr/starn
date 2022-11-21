import type {Socket} from 'net';
import type {ParametersSender} from '../types/parameters-sender';
import type {Message} from '../types/message';
import {DataStarn} from '../data.starn';

import {ConnectStarn} from '../connect.starn';
import {TopicsStarn} from '../topics.starn';
import {SendMessage} from './send-message';

export class Sender {
	private static readonly data: DataStarn = new DataStarn();
	private static readonly send: SendMessage = new SendMessage();
	messageType?: string;
	topics: TopicsStarn;
	private readonly connection: Socket;

	constructor(params: ParametersSender) {
		this.connection = new ConnectStarn({
			port: params.port,
			host: params.host,
		}).getConnection();
		this.messageType = params.typeMessage;
		this.topics = new TopicsStarn();
	}

	sendMessage(topic: string, data: Message): boolean {
		if (this.messageType) {
			Sender.data.typesAreEquals(data, this.messageType);
		}

		Sender.send.sendMessageToClient(topic, data, this.connection);

		return true;
	}
}

