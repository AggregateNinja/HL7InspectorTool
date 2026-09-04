import { Hl7SegmentDefinition } from './hl7-segment-definition.model';

/* Example:
export const adtA01Profile: Hl7MessageProfile = {
  id: 'ATLANTICARE_ADT_A01_V1',
  name: 'AtlantiCare ADT A01',
  hl7Version: '2.8',
  messageCode: 'ADT',
  triggerEvent: 'A01',
  messageStructure: 'ADT_A01',
  segments: [
    {
      segmentId: 'PID',
      name: 'Patient Identification',
      usage: 'R',
      minOccurrences: 1,
      maxOccurrences: 1,
      fields: [
        {
          path: 'PID-3',
          name: 'Patient Identifier List',
          dataType: 'CX',
          usage: 'R',
          minRepetitions: 1
        }
      ]
    }
  ]
};
*/
export interface Hl7MessageProfile {
  id: string;
  name: string;

  hl7Version: string;
  messageCode: string;
  triggerEvent: string;
  messageStructure: string;

  segments: readonly Hl7SegmentDefinition[];
}