import { Hl7DataType } from "./data-type.model";
/**
 * HL7 v2.8 - DT - Date
 * Example: 
 * const dateOfBirth: Hl7Date = {
 *  rawValue: '19900415',
 *  year: 1990,
 *  month: 4,
 *  day: 15
 * };
 */
export interface Hl7Date extends Hl7DataType {
  /**
   * Original HL7 value, such as:
   * 19900415
   * 199004
   * 1990
   */
  year?: number;
  month?: number;
  day?: number;
}