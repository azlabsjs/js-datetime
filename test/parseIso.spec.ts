import { parseISO } from '../src/parse-iso';

describe('Parse iso date format test', () => {
  it('should create a javascript date instance from an ISO standard string', () => {
    const output = parseISO('2022-03-24T06:14:31+01:00');
    expect(typeof output).toBe('object');
  });
});
