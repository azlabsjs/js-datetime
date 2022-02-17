import { MONTHS } from './lang/months';
import { Month } from './types';

/**
 * Funtional interface for converting Roman Calendar month index into a
 * language dependant label using pre-configured list of months with
 *
 * @param value
 * @param lang
 */
export const ParseMonth = (value: number, lang: keyof Month = 'fr') => {
  const result = MONTHS.filter((month: Month) => +month.id === +value);
  return result.length !== 0 ? result[0][lang] : value;
};
