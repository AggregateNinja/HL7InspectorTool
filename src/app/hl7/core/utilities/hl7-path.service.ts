import { Hl7Message } from "../models/hl7-syntax.model";
import { Hl7Location } from "../models/hl7-location.model";

export interface Hl7PathService {
  getValue(
    message: Hl7Message,
    location: Hl7Location
  ): string | undefined;

  setValue(
    message: Hl7Message,
    location: Hl7Location,
    value: string
  ): Hl7Message;
}