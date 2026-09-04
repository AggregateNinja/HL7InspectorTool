import { Hl7DataType } from "./data-type.model";
import { Hl7TimeStamp } from '../data-types/ts.model';

/**
 * HL7 v2.8 - DR - Date/time Range
 */
export interface Hl7DateRange extends Hl7DataType {
  start?: Hl7TimeStamp;
  end?: Hl7TimeStamp;
}