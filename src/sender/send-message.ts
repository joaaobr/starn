import type {Socket} from 'net';
import type {ArrayMessage} from '../types/array-message';
import type {Message} from '../types/message';
import {MakeMessage} from './make-message';
export class SendMessage {
	private static readonly make: MakeMessage = new MakeMessage();

	sendMessageToClient(topic: string, message: Message | ArrayMessage, connection: Socket) {
		connection.write(SendMessage.make.makeMessage(topic, message),
			err => {
				if (err) {
					throw err;
				}
			});
	}
}
