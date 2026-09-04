import { Hl7Segment } from './hl7-syntax.model';

import { MshSegment } from '../../segments/msh.model';
import { PidSegment } from '../../segments/pid.model';
import { Pv1Segment } from '../../segments/pv1.model';
import { Pv2Segment } from '../../segments/pv2.model';
import { OrcSegment } from '../../segments/orc.model';
import { ObrSegment } from '../../segments/obr.model';
import { ObxSegment } from '../../segments/obx.model';
import { NteSegment } from '../../segments/nte.model';

export type KnownSegment =
  | MshSegment
  | PidSegment
  | Pv1Segment
  | Pv2Segment
  | OrcSegment
  | ObrSegment
  | ObxSegment
  | NteSegment;

export type ParsedSegment =
  | {
      kind: 'known';
      value: KnownSegment;
    }
  | {
      kind: 'unknown';
      value: Hl7Segment;
    };