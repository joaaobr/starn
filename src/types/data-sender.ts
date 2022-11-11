import type {Message} from './message';
import type {ArrayMessage} from './array-message';

export type DataSender = {
	message: Message | ArrayMessage;
	time: number;
	messageSendindType: 'Send Message' | 'Validate Topic';
	topic: string;
	topics?: string[];
};
