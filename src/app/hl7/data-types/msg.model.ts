import { Hl7DataType } from "./data-type.model";
/**
 * HL7 v2.8 - MSG - Message Type
Example: 
const messageType: Hl7MessageType = {
    rawValue: 'ADT^A01^ADT_A01',
    messageCode: 'ADT',
    triggerEvent: 'A01',
    messageStructure: 'ADT_A01'
};
 */
export interface Hl7MessageType extends Hl7DataType {
    /**
   * Original component value, for example:
   * ADT^A01^ADT_A01
   */
  //rawValue?: string;

  /**
   * MSH-9.1
   * Examples: ADT, ORU, ORM
   */
  messageCode?: string;

  /**
   * MSH-9.2
   * Examples: A01, R01, O01
   */
  triggerEvent?: string;

  /**
   * MSH-9.3
   * Examples: ADT_A01, ORU_R01, ORM_O01
   */
  messageStructure?: string;
}