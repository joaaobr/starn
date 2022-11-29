import type {Message} from './message';

export type DataSender = {
	message: Message | Message[];
	topics?: string[];
	messageSendindType?:
	| 'Send Message'
	| 'Get Topics'
	| 'Topic Connected'
	| 'Disconnect Topic'
	| 'Validate Key'
	| 'Create Topic'
	| 'Remove Topic';
	topic: string;
	messageState?: string;
	id?: string;
};
