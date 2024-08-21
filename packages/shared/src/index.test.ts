import '@types/jest';
import { sum } from './index'

describe('test function sum', () => {

	test('Correct value', () => {
		expect(sum(1,5)).toBe(6)
	})

	test('Incorrect value', () => {
		expect(sum(6,5)).not.toBe(65)
	})
})