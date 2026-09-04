import { Hl7Location } from "../models/hl7-location.model";
import { Hl7Message } from "../models/hl7-syntax.model";
import { Hl7ValidationIssue } from "../validation/hl7-validation-issue.model";

export interface Hl7EditorState { 
  sourceText: string;
  message: Hl7Message | null;
  selectedLocation: Hl7Location | null;
  validationIssues: readonly Hl7ValidationIssue[];
  dirty: boolean;
}