import {CentralMessages} from '../index';

describe('is it possible to create a new Central Messages', () => {
	let centralMessages: CentralMessages;

	beforeAll(() => {
		centralMessages = new CentralMessages({
			port: 2020,
			host: 'localhost',
			topics: ['A', 'B', 'C'],
		});
	});

	it('validate if Starn properties exist', () => {
		expect(centralMessages).toHaveProperty('port');
		expect(centralMessages).toHaveProperty('host');
		expect(centralMessages).toHaveProperty('socket');
	});

	it('validate if properties have their true values', () => {
		expect(centralMessages.port).toStrictEqual(2020);
		expect(centralMessages.host).toStrictEqual('localhost');
	});
});
