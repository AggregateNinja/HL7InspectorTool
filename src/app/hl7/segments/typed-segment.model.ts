import { Hl7Segment } from "../core/models/hl7-syntax.model";

export interface TypedSegment {
  readonly segmentId: string;

  /**
   * The source property keeps the typed model connected to its generic segment. 
   * This is useful when the user changes a semantic property and you need to update the precise field in the raw message.
   */
  readonly source: Hl7Segment;
}