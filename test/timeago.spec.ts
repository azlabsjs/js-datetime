import { JSDate } from '../src';
import { GetTimeAgo } from '../src/timeago';

describe('TimeAgo utilities tests', () => {
  it('ParseMonth(1, "en") should returns January while ParseMonth(24, "en") returns 24', () => {
    const date = new Date('2022-02-10T00:00:00');
    const timeago = GetTimeAgo()(date, 'en-US');
    if (JSDate.isPast(date)) {
      expect(timeago.includes('ago')).toEqual(true);
    } else {
      expect(timeago.includes('after')).toEqual(true);
    }
  });
});
