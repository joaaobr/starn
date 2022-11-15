import type {Message} from './message';
import type {ArrayMessage} from './array-message';

export type DataSender = {
	message: Message | ArrayMessage;
	time: number;
	messageSendindType?: 'Send Message' | 'Validate Topic' | 'Topic Connected';
	topic: string;
	topics?: string[];
	messageState?: string;
};
