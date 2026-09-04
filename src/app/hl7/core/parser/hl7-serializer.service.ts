import { Injectable } from "@angular/core";
import { Hl7Message } from "../models/hl7-syntax.model";

@Injectable({
  providedIn: 'root'
})
export class Hl7SerializerService {
  serialize(message: Hl7Message): string {
    throw new Error('Not implemented');
  }
}