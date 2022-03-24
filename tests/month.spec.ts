import { ParseMonth } from '../src';

describe('Month utilities tests', () => {
  it('ParseMonth(1, "en") should returns January while ParseMonth(24, "en") returns 24', () => {
    expect(ParseMonth(1, 'en')).toEqual('January');
    expect(ParseMonth(24, 'en')).toEqual(24);
  });
});
