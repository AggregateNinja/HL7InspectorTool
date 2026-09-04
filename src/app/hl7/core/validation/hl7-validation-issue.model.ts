import { Hl7Location } from "../models/hl7-location.model";

export type Hl7ValidationSeverity =
  | 'error'
  | 'warning'
  | 'information';

export type Hl7ValidationCode =
  | 'required'
  | 'invalid-format'
  | 'invalid-code'
  | 'too-long'
  | 'unsupported-segment'
  | 'structure';

export interface Hl7ValidationIssue {
  severity: Hl7ValidationSeverity;
  code: Hl7ValidationCode;
  message: string;
  location?: Hl7Location;
}