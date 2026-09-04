import { Hl7DataType } from "./data-type.model";
import { Hl7HierarchicDesignator } from "./hd.model";

/**
 * HL7 v2.8 - CX - Extended Composite Id With Check Digit
 */
export interface Hl7Identifier extends Hl7DataType {
  value?: string;
  checkDigit?: string;
  checkDigitScheme?: string;
  assigningAuthority?: Hl7HierarchicDesignator;
  identifierTypeCode?: string;
  assigningFacility?: Hl7HierarchicDesignator;
}