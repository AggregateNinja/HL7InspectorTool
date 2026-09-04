export interface Hl7Message {
  rawValue: string;
  delimiters: Hl7Delimiters;
  segments: Hl7Segment[];
}

export interface Hl7Segment {
  id: string;
  sequence: number;
  rawValue: string;
  fields: Hl7Field[];
}

export interface Hl7Field {
    position: number;
    rawValue: string;
    repetitions: Hl7Repetition[];
}

export interface Hl7Repetition {
  rawValue: string;
  components: Hl7Component[];
}

export interface Hl7Component {
  rawValue: string;
  subcomponents: Hl7Subcomponent[];
}

export interface Hl7Subcomponent {
  rawValue: string;
}

export interface Hl7Delimiters {
    readonly field: string;
    readonly component: string;
    readonly repetition: string;
    readonly escape: string;
    readonly subcomponent: string;
    readonly segment: string;
}