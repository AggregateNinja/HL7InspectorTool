import { TypedSegment } from "./typed-segment.model";
import { Hl7HierarchicDesignator } from "../data-types/hd.model";
import { Hl7TimeStamp } from "../data-types/ts.model";
import { Hl7MessageType } from "../data-types/msg.model";

export interface MshSegment extends TypedSegment {
  readonly segmentId: 'MSH';

  sendingApplication?: Hl7HierarchicDesignator;
  sendingFacility?: Hl7HierarchicDesignator;
  receivingApplication?: Hl7HierarchicDesignator;
  receivingFacility?: Hl7HierarchicDesignator;

  messageDateTime?: Hl7TimeStamp;
  messageType?: Hl7MessageType;
  messageControlId?: string;
  processingId?: string;
  versionId?: string;
}
