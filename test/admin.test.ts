import {Admin} from '../index';

describe('is it possible to create a new admin', () => {
	let admin: Admin;

	beforeAll(() => {
		admin = new Admin({
			port: 2020,
			host: 'localhost',
		},
		'test');
	});
	it('validate that all admin properties exist', () => {
		expect(admin).toHaveProperty('connection');
		expect(admin).toHaveProperty('key');
	});

	it('admin key is the same as expected', () => {
		expect(admin.key).toEqual('test');
	});

	it('is it possible create new topic', () => {
		admin.createTopic('D');
	});

	it('is it possible to view topics', () => {
		admin.listTopics(topics => {
			expect(topics).toEqual(['A', 'B', 'C', 'D']);
		});
	});
});
