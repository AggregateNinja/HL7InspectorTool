/**
 * HL7 v2.3.1 - TS - Time Stamp
 */
export interface Hl7TimeStamp {
  rawValue: string;

  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  fractionalSecond?: string;

  timezoneOffset?: string;
  precision?: Hl7TimestampPrecision;
}

export type Hl7TimestampPrecision =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'fraction';