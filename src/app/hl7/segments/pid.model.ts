import { TypedSegment } from "./typed-segment.model";
import { Hl7Identifier } from "../data-types/cx.model";
import { Hl7PersonName } from "../data-types/xpn.model";
import { Hl7Address } from "../data-types/xad.model";
import { Hl7Date } from "../data-types/dt.model";
import { Hl7TelecommunicationAddress } from "../data-types/xtn.model";

export interface PidSegment extends TypedSegment {
  readonly segmentId: 'PID';

  setId?: number;
  patientIdentifiers: Hl7Identifier[];
  patientNames: Hl7PersonName[];
  dateOfBirth?: Hl7Date;
  administrativeSex?: string;
  addresses: Hl7Address[];
  phoneNumbers: Hl7TelecommunicationAddress[];
}