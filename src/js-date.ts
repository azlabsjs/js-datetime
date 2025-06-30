import {
  INTL_DATE_TIME_FORMATS,
  MS_PER_DAYS_,
  MS_PER_HOURS_,
  MS_PER_MINUTES_,
  MS_PER_SECONDS_,
  MS_PER_WEEKS_,
} from './constants';
import { createFromFormat } from './format';
import { parseISO } from './parse-iso';
import {
  AdditionalDigits,
  DateTimeFormat,
  JsDateParamType,
  UnitOfTime,
} from './types';

/**
 * JSDate is an utility class for manipulating javascript date object. It offers various
 * methods to serve this purpose.
 *
 * Note: The package being under active development, required method will be added and Api
 * can be changed.
 */
export class JSDate {
  private static LOCALE_ = 'en-US';

  /** Set the global local to use when formating dates */
  static locale(lang?: string) {
    if (lang) {
      JSDate.LOCALE_ = lang;
    }
    return JSDate.LOCALE_;
  }

  /**
   * Creates a javascript date object
   *
   * ** Note **
   * Parsing from format is not yet implemented
   */
  static create<T extends JsDateParamType>(value?: T, format?: string) {
    // #region ensureDate()
    const makeDate = (value_: unknown) =>
      typeof value_ === 'undefined' || value_ === null
        ? new Date()
        : typeof value_ === 'number'
          ? new Date(value_)
          : value_ instanceof Date
            ? new Date(value_.getTime())
            : (value_ as Date);
    // #endregion

    return typeof value === 'string'
      ? JSDate.createFromFormat_(value, format)
      : makeDate(value);
  }

  /** Substract time unit from a js date */
  static substract<T extends JsDateParamType>(
    unit: UnitOfTime,
    date?: T,
    value = 1
  ) {
    const today = JSDate.computeInterval(
      JSDate.create(date),
      unit,
      value,
      false
    );
    return JSDate.create(today.toISOString());
  }

  /** Adds time unit from a js date */
  static add<T extends JsDateParamType>(unit: UnitOfTime, date?: T, value = 1) {
    const today = JSDate.computeInterval(JSDate.create(date), unit, value);
    return JSDate.create(today.toISOString());
  }

  /** Checks if a given date is before the current date */
  static isPast<T extends JsDateParamType>(date: T) {
    return JSDate.isBefore<T>(date, JSDate.now() as T);
  }

  /** Checks if a given date is after the current date */
  static isFuture<T extends JsDateParamType>(date: T) {
    return JSDate.isAfter<T>(date, JSDate.now() as T);
  }

  /** Checks if a given date is after another date */
  static isAfter<T extends JsDateParamType>(date1: T, date2: T) {
    return JSDate.create(date1).getTime() - JSDate.create(date2).getTime() > 0;
  }

  /** Checks if a given date is before another date */
  static isBefore<T extends JsDateParamType>(date1: T, date2: T) {
    return JSDate.create(date1).getTime() - JSDate.create(date2).getTime() < 0;
  }

  /** evaluate if the given parameter is a valid JsDateParamType */
  static isDate(date: Date) {
    return (
      date instanceof Date ||
      (typeof date === 'object' &&
        Object.prototype.toString.call(date) === '[object Date]')
    );
  }

  static isValid(date: JsDateParamType) {
    try {
      const value = JSDate.create(date);
      return (
        typeof value !== 'undefined' &&
        value !== null &&
        value?.toDateString() !== 'Invalid Date'
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      return false;
    }
  }

  /** Get the month part of a given date */
  static getMonth<T extends JsDateParamType>(date?: T) {
    return JSDate.create(date).getMonth();
  }

  /** Get the year part of a given date */
  static getYear<T extends JsDateParamType>(date?: T) {
    return JSDate.create(date).getFullYear();
  }

  /** Get the day of the week part of a given date */
  static getDay<T extends JsDateParamType>(date?: T) {
    return JSDate.create(date).getDay();
  }

  /** Get the day of the month part of a given date */
  static getDate<T extends JsDateParamType>(date?: T) {
    return JSDate.create(date).getDate();
  }

  /** Get hours part of date time object */
  static getHours<T extends JsDateParamType>(date?: T) {
    return JSDate.create(date).getHours();
  }

  /** Get minutes part of date time object */
  static getMinutes<T extends JsDateParamType>(date?: T) {
    return JSDate.create(date).getMinutes();
  }

  /** Get seconds part of date time object */
  static getSeconds<T extends JsDateParamType>(date?: T) {
    return JSDate.create(date).getSeconds();
  }

  /** Get ms part of date time object */
  static getMilliseconds<T extends JsDateParamType>(date?: T) {
    return JSDate.create(date).getMilliseconds();
  }

  /** compute time difference between two JavaScript dates */
  static diff<T extends JsDateParamType>(
    date1: T,
    date2: T,
    unit: UnitOfTime = 'ms'
  ) {
    const date1_ = JSDate.create(date1);
    const date2_ = JSDate.create(date2);
    switch (unit) {
      case 'year':
      case 'years':
      case 'y':
        return date1_.getFullYear() - date2_.getFullYear();
      case 'month':
      case 'months':
      case 'M':
        return JSDate.monthDiff(date1_, date2_);
      case 'week':
      case 'weeks':
      case 'w':
        return JSDate.computeTimeDiff(date1_, date2_, MS_PER_WEEKS_);
      case 'day':
      case 'days':
      case 'd':
        return JSDate.computeTimeDiff(date1_, date2_, MS_PER_DAYS_);
      case 'hour':
      case 'hours':
      case 'h':
        return JSDate.computeTimeDiff(date1_, date2_, MS_PER_HOURS_);
      case 'minute':
      case 'minutes':
      case 'm':
        return JSDate.computeTimeDiff(date1_, date2_, MS_PER_MINUTES_);
      case 'second':
      case 'seconds':
      case 's':
        return JSDate.computeTimeDiff(date1_, date2_, MS_PER_SECONDS_);
      case 'millisecond':
      case 'milliseconds':
      case 'ms':
        return JSDate.computeTimeDiff(date1_, date2_);
      default:
        return JSDate.computeTimeDiff(date1_, date2_);
    }
  }

  /**
   * returns the current date object
   */
  static now() {
    return JSDate.create();
  }

  /**
   * format Javascript date object
   */
  static format<T extends JsDateParamType>(
    date?: T,
    format: DateTimeFormat | string = 'L'
  ) {
    if (['LT', 'LTS'].indexOf(format) !== -1) {
      return JSDate.create(date).toLocaleTimeString(
        JSDate.LOCALE_,
        INTL_DATE_TIME_FORMATS[format]
      );
    }
    if (['l', 'LL', 'll', 'LLL', 'lll', 'L'].indexOf(format) !== -1) {
      return JSDate.create(date).toLocaleString(
        JSDate.LOCALE_,
        INTL_DATE_TIME_FORMATS[format]
      );
    }
    return JSDate.rawFormat(JSDate.create(date), format);
  }

  /**
   * computes the number of milliseconds differences between a givendate and today.
   */
  static timeSince<T extends JsDateParamType>(date: T) {
    return Math.floor(
      JSDate.computeTimeDiff(JSDate.now(), JSDate.create(date))
    );
  }

  static toDate(argument: Date | number) {
    const toStringFunction = Object.prototype.toString.call(argument);
    if (
      argument instanceof Date ||
      (typeof argument === 'object' && toStringFunction === '[object Date]')
    ) {
      return new Date(argument.getTime());
    } else if (
      typeof argument === 'number' ||
      toStringFunction === '[object Number]'
    ) {
      return new Date(argument);
    }
    return new Date(NaN);
  }

  static getUTCDayOfYear(date: Date | number) {
    const date_ = JSDate.toDate(date);
    if (typeof date_ === 'undefined' || date_ === null) {
      return false;
    }
    const timestamp = date_.getTime();
    date_.setUTCMonth(0, 1);
    date_.setUTCHours(0, 0, 0, 0);
    const startOfYearTimestamp = date_.getTime();
    const difference = timestamp - startOfYearTimestamp;
    return Math.floor(difference / MS_PER_DAYS_) + 1;
  }

  static iso8601(date: string, options?: AdditionalDigits) {
    return parseISO(date, options);
  }

  static utcOffset<T extends JsDateParamType>(date: T) {
    return JSDate.create(date).getTimezoneOffset();
  }

  private static rawFormat(date: Date, format: string) {
    function createReplaceFirst(d: Date) {
      function decorated(
        value: string,
        list: string[],
        func: (d: Date, o: Intl.DateTimeFormatOptions) => string
      ) {
        for (const current of list) {
          if (value.includes(current)) {
            value = value.replace(new RegExp(current, 'gi'), (match) => {
              match = match.toUpperCase();
              const inputFormat_ = INTL_DATE_TIME_FORMATS[match];
              return `${func(d, inputFormat_)}`;
            });
            break;
          }
        }
        return value;
      }

      return decorated;
    }

    return [
      {
        format: ['YYYY', 'Y'],
        fn: (date: Date, options: Intl.DateTimeFormatOptions) =>
          date.toLocaleDateString(JSDate.LOCALE_, options),
      },
      {
        format: ['MMMM', 'MMM', 'MM', 'M'],
        fn: (date: Date, options: Intl.DateTimeFormatOptions) =>
          date.toLocaleDateString(JSDate.LOCALE_, options),
      },
      {
        format: ['DD', 'D'],
        fn: (date: Date, options: Intl.DateTimeFormatOptions) =>
          date.toLocaleDateString(JSDate.LOCALE_, options),
      },
      {
        format: ['HH', 'H'],
        fn: (date: Date, options: Intl.DateTimeFormatOptions) =>
          date.toLocaleTimeString(JSDate.LOCALE_, options),
      },
      {
        format: ['II', 'I'],
        fn: (date: Date, options: Intl.DateTimeFormatOptions) =>
          date.toLocaleTimeString(JSDate.LOCALE_, options),
      },
      {
        format: ['SS', 'S'],
        fn: (date: Date, options: Intl.DateTimeFormatOptions) =>
          date.toLocaleTimeString(JSDate.LOCALE_, options),
      },
    ]
      .reduce((carry, current) => {
        carry = createReplaceFirst(date)(carry, current.format, current.fn);
        return carry;
      }, format.toUpperCase())
      .replace(' h', '')
      .replace(' PM', 'PM')
      .replace(' AM', 'AM');
  }

  private static computeInterval(
    today: Date,
    unit: UnitOfTime,
    value: number,
    increment = true
  ) {
    switch (unit) {
      case 'year':
      case 'years':
      case 'y':
        return this.updateYear(today, value, increment);
      case 'month':
      case 'months':
      case 'M':
        return this.updateMonth(today, value, increment);
      case 'week':
      case 'weeks':
      case 'w':
        return this.updateDate(today, value * 7, increment);
      case 'day':
      case 'days':
      case 'd':
        return this.updateDate(today, value, increment);
      case 'hour':
      case 'hours':
      case 'h':
        return this.updateHours(today, value, increment);
      case 'minute':
      case 'minutes':
      case 'm':
        return this.updateMinutes(today, value, increment);
      case 'second':
      case 'seconds':
      case 's':
        return this.updateSeconds(today, value, increment);
      case 'millisecond':
      case 'milliseconds':
      case 'ms':
        return this.updateMilliSeconds(today, value, increment);
      default:
        return this.updateMilliSeconds(today, value, increment);
    }
  }

  private static updateMilliSeconds(
    t: Date,
    value: number,
    increment: boolean = true
  ) {
    const ms = t.getMilliseconds();
    const delta = increment ? ms + value : ms - value;
    t.setMilliseconds(delta);
    return t;
  }

  private static updateSeconds(
    t: Date,
    value: number,
    increment: boolean = true
  ) {
    const s = t.getSeconds();
    const delta = increment ? s + value : s - value;
    t.setSeconds(delta);
    return t;
  }

  private static updateMinutes(
    t: Date,
    value: number,
    increment: boolean = true
  ) {
    const m = t.getMinutes();
    const delta = increment ? m + value : m - value;
    t.setMinutes(delta);
    return t;
  }

  private static updateHours(
    t: Date,
    value: number,
    increment: boolean = true
  ) {
    const h = t.getHours();
    const delta = increment ? h + value : h - value;
    t.setHours(delta);
    return t;
  }

  private static updateDate(t: Date, value: number, increment: boolean = true) {
    const d = t.getDate();
    const delta = increment ? d + value : d - value;
    t.setDate(delta);
    return t;
  }

  private static updateMonth(
    t: Date,
    value: number,
    increment: boolean = true
  ) {
    const m = t.getMonth();
    const delta = increment ? m + value : m - value;
    t.setMonth(delta);
    return t;
  }

  private static updateYear(t: Date, value: number, increment: boolean = true) {
    const y = t.getFullYear();
    const delta = increment ? y + value : y - value;
    t.setFullYear(delta);
    return t;
  }

  private static computeTimeDiff(date1: Date, date2: Date, factor = 1) {
    return Math.round((date1.getTime() - date2.getTime()) / factor);
  }

  private static monthDiff(date1: Date, date2: Date) {
    let months =
      (date1.getFullYear() - date2.getFullYear()) * 12 - date1.getMonth();
    months += date2.getMonth();
    return months;
  }

  private static createFromFormat_(date: string, format?: string) {
    if (typeof format !== 'string') {
      return parseISO(date);
    }
    return createFromFormat(date, format);
  }
}
