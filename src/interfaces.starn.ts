type Message = string | Buffer | number | Record<string, unknown>;
type ArrayMessage = Message[];

type ParametersStarn = {
	port: number;
	host?: string;
	topics: string[];
};

type ParametersConnectionStarn = {
	port: number;
	host?: string;
};

type ParametersSender = {
	typeMessage?: 'string' | 'array' | 'object' | 'buffer';
} & ParametersConnectionStarn;

type DataSender = {
	message: Message | ArrayMessage;
	time: number;
	messageSendindType: 'Send Message' | 'Validate Topic';
	topic: string;
	topics?: string[];
};

export type {
	ParametersStarn,
	ParametersConnectionStarn,
	ParametersSender,
	DataSender,
	Message,
	ArrayMessage,
};
