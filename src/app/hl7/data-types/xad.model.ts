/**
 * HL7 v2.8 - XAD - Extended Address
 */
import { Hl7DataType } from "./data-type.model";
//import { Hl7CodedElement } from '../data-types/ce.model';
import { Hl7TimeStamp } from '../data-types/ts.model';
import { Hl7DateRange } from '../data-types/dr.model';

export interface Hl7Address extends Hl7DataType {
  /**
   * XAD.1
   */
  streetAddress?: string;

  /**
   * XAD.2
   */
  otherDesignation?: string;

  /**
   * XAD.3
   */
  city?: string;

  /**
   * XAD.4
   */
  stateOrProvince?: string;

  /**
   * XAD.5
   */
  postalCode?: string;

  /**
   * XAD.6
   */
  country?: string;

  /**
   * XAD.7
   */
  addressType?: string;

  /**
   * XAD.8
   */
  otherGeographicDesignation?: string;

  /**
   * XAD.9
   */
  countyParishCode?: string;

  /**
   * XAD.10
   */
  censusTract?: string;

  /**
   * XAD.11
   */
  addressRepresentationCode?: string;

  /**
   * XAD.12
   */
  addressValidityRange?: Hl7DateRange;

  /**
   * XAD.13
   */
  effectiveDate?: Hl7TimeStamp;

  /**
   * XAD.14
   */
  expirationDate?: Hl7TimeStamp;

  /**
   * XAD.15
   */
  expirationReason?: string;

  /**
   * XAD.16
   */
  temporaryIndicator?: string;

  /**
   * XAD.17
   */
  badAddressIndicator?: string;

  /**
   * XAD.18
   */
  addressUsage?: string;

  /**
   * XAD.19
   */
  addressee?: string;

  /**
   * XAD.20
   */
  comment?: string;

  /**
   * XAD.21
   */
  preferenceOrder?: number;
}