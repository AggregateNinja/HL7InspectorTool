import { Hl7DataType } from "./data-type.model";
/**
 * HL7 v2.8 - XPN - Extended Person Name
 */
export interface Hl7PersonName extends Hl7DataType {
  familyName?: string;
  givenName?: string;
  secondName?: string;
  suffix?: string;
  prefix?: string;
  degree?: string;
  nameTypeCode?: string;
}