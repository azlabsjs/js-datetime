/**
 * Interface representing Roman Calendar month by index
 * with internationalization locales
 */
export interface Month {
  id: number;
  fr: string;
  en: string;
}

/**
 * Type definition of value that can be passed as parameter for
 * {@see JSDate.create()} a.k.a values parseable as Javascript
 * date object
 */
export type JsDateParamType = string | number | Date | undefined;
