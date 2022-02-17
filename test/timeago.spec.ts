import { JSDate, GetTimeAgo, TimeAgo } from '../src';

describe('TimeAgo utilities tests', () => {
  it('GetTimeAgo()(date, "en-US") should returns a message depending on the current date', () => {
    const date = new Date('2022-02-10T00:00:00');
    const timeago = GetTimeAgo()(date, 'en-US');
    if (JSDate.isPast(date)) {
      expect(timeago.includes('ago')).toEqual(true);
    } else {
      expect(timeago.includes('after')).toEqual(true);
    }
  });

  it('new TimeAgo().format(date, "en-US") should returns a message depending on the current date', () => {
    const date = new Date('2022-02-10T00:00:00');
    const timeago = new TimeAgo().format(date, 'en-US');
    if (JSDate.isPast(date)) {
      expect(timeago.includes('ago')).toEqual(true);
    } else {
      expect(timeago.includes('after')).toEqual(true);
    }
  });
});
