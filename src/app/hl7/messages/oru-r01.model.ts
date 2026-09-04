import { MshSegment } from "../segments/msh.model";
import { PidSegment } from "../segments/pid.model";
import { Pv1Segment } from "../segments/pv1.model";
import { Pv2Segment } from "../segments/pv2.model";
import { ObrSegment } from "../segments/obr.model";
import { ObxSegment } from "../segments/obx.model";
import { NteSegment } from "../segments/nte.model";
import { OrcSegment } from "../segments/orc.model";
import { Hl7Segment } from "../core/models/hl7-syntax.model";


export interface OruR01Message {
  readonly messageType: 'ORU_R01';

  msh: MshSegment;
  patientResults: OruPatientResultGroup[];
  trailingSegments: Hl7Segment[];
}

export interface OruPatientResultGroup {
  pid?: PidSegment;
  patientNotes: NteSegment[];
  visits: OruVisitGroup[];
  orders: OruOrderObservationGroup[];
}

export interface OruVisitGroup {
  pv1?: Pv1Segment;
  pv2?: Pv2Segment;
}

export interface OruOrderObservationGroup {
  orc?: OrcSegment;
  obr: ObrSegment;
  orderNotes: NteSegment[];
  observations: OruObservationGroup[];
}

export interface OruObservationGroup {
  obx: ObxSegment;
  notes: NteSegment[];
}