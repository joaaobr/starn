import {Sender} from '../index';

describe('is it possible to create a new sender', () => {
	let sender: Sender;

	beforeAll(() => {
		sender = new Sender({
			port: 2020,
			host: 'localhost',
			typeMessage: 'string',
		},
		);
	});

	it('validate if sender properties exist', () => {
		expect(sender).toHaveProperty('connection');
	});

	it('validate if is possible send message', () => {
		expect(sender.sendMessage('A', 'Hello A')).toBe(true);
	});
});
