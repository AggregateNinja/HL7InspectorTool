export interface Hl7Location {
  segmentId: string;
  segmentOccurrence: number;
  field?: number;
  repetition?: number;
  component?: number;
  subcomponent?: number;
}

export interface Hl7LocationRange {
  start: Hl7Location;
  end: Hl7Location;
}

export interface Hl7NodeIndex {
  segmentIndex: number;
  fieldIndex?: number;
  repetitionIndex?: number;
  componentIndex?: number;
  subcomponentIndex?: number;
}