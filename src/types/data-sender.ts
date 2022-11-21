import type {Message} from './message';
import type {ArrayMessage} from './array-message';

export type DataSender = {
	message: Message | ArrayMessage;
	time: number;
	messageSendindType?:
	| 'Send Message'
	| 'Get Topics'
	| 'Topic Connected'
	| 'Disconnect Topic'
	| 'List Topics'
	| 'Validate Key'
	| 'Create Topic'
	| 'Remove Topic';
	topic: string;
	topics?: string[];
	messageState?: string;
	id?: string;
};
