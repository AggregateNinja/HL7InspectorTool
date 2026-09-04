import { TypedSegment } from "./typed-segment.model";

export interface ObxSegment extends TypedSegment {
    readonly segmentId: 'OBX';
}
