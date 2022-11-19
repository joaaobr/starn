import type {Socket} from 'net';
import type {ParametersSender} from '../types/parameters-sender';
import type {Message} from '../types/message';
import type {ArrayMessage} from '../types/array-message';
import {DataStarn} from '../data.starn';

import {ConnectStarn} from '../connect.starn';
import {TopicsStarn} from '../topics.starn';
import {SendMessage} from './send-message';

export class Sender {
	private static readonly data: DataStarn = new DataStarn();
	private static readonly send: SendMessage = new SendMessage();
	type?: string;
	topics: TopicsStarn;
	private readonly connection: Socket;

	constructor(params: ParametersSender) {
		this.connection = new ConnectStarn({
			port: params.port,
			host: params.host,
		}).getConnection();
		this.type = params.typeMessage;
		this.topics = new TopicsStarn();
	}

	sendMessage(topic: string, data: Message | ArrayMessage): boolean {
		if (this.type) {
			Sender.data.typesEquals(data, this.type);
		}

		Sender.send.sendMessageToClient(topic, data, this.connection);

		return true;
	}
}

