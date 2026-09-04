import { Hl7DataType } from "./data-type.model";
import { Hl7TimeStamp } from "../data-types/ts.model";
/**
 * HL7 v2.8 - XTN - Extended Telecommunication Number
 */
export interface Hl7TelecommunicationAddress extends Hl7DataType {
  telephoneNumber?: string;
  telecommunicationUseCode?: string;
  telecommunicationEquipmentType?: string;
  emailAddress?: string;

  countryCode?: string;
  areaOrCityCode?: string;
  localNumber?: string;
  extension?: string;

  descriptiveComment?: string;
  extensionPrefix?: string;
  speedDialCode?: string;
  unformattedTelephoneNumber?: string;

  effectiveStartDate?: Hl7TimeStamp;
  expirationDate?: Hl7TimeStamp;
}