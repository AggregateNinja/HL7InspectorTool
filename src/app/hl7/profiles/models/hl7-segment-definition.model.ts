import { Hl7FieldDefinition } from './hl7-field-definition.model';
import { Hl7Usage } from './hl7-usage.type';

export interface Hl7SegmentDefinition {
  segmentId: string;
  name: string;
  usage: Hl7Usage;

  minOccurrences: number;
  maxOccurrences?: number;

  fields: readonly Hl7FieldDefinition[];
}