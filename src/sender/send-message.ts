import type {Socket} from 'net';
import type {Message} from '../types/message';
export class SendMessage {
	private makeMessage(topic: string, message: Message): string {
		return JSON.stringify({
			topic,
			messageSendindType: 'Send Message',
			message,
		}).concat('\n');
	}

	// eslint-disable-next-line @typescript-eslint/member-ordering
	sendMessageToClient(topic: string, message: Message, connection: Socket): void {
		connection.write(this.makeMessage(topic, message), err => {
			if (err) {
				throw err;
			}
		});
	}
}
