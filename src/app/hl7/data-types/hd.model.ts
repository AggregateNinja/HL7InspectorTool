import { Hl7DataType } from "./data-type.model";
/**
 * HL7 v2.8 - HD - Hierarchic Designer
 */
export interface Hl7HierarchicDesignator extends Hl7DataType {
  namespaceId?: string;
  universalId?: string;
  universalIdType?: string;
}