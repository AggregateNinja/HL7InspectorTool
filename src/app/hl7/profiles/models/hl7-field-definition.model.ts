import { Hl7Usage } from './hl7-usage.type';

export interface Hl7FieldDefinition {
  /**
   * HL7 path such as PID-3 or OBX-5.
   */
  path: string;

  /**
   * Human-readable field name.
   */
  name: string;

  /**
   * HL7 datatype code such as CX, XPN, TS, CE, or ST.
   */
  dataType: string;

  usage: Hl7Usage;

  minRepetitions: number;
  maxRepetitions?: number;

  maxLength?: number;

  /**
   * Optional value-set identifier rather than embedding every code.
   */
  valueSetId?: string;
}