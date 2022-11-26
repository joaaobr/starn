import {Sender} from '../index';
import {Client} from '../index';

describe('is it possible to create a new client', () => {
	let sender: Sender;
	let client: Client;

	beforeAll(() => {
		sender = new Sender({
			port: 2020,
			host: 'localhost',
			typeMessage: 'string',
		});

		client = new Client({port: 2020, host: 'localhost'});

		sender.sendMessage('A', 'Hello A');
		sender.sendMessage('B', 'Hello B');
		sender.sendMessage('C', 'Hello C');
	});

	it('validate if client properties exist', () => {
		expect(client).toHaveProperty('connection');
	});

	it('validate if data of topics were sending', () => {
		client.getMessage('A', (message, time, topic) => {
			expect(message).toBe('Hello A');
			expect(topic).toBe('A');
		});

		client.getMessage('B', (message, time, topic) => {
			expect(message).toBe('Hello B');
			expect(topic).toBe('B');
		});

		client.getMessage('C', (message, time, topic) => {
			expect(message).toBe('Hello C');
			expect(topic).toBe('C');
		});
	});
});
