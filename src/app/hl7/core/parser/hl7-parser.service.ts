import { Injectable } from "@angular/core";
import { 
  Hl7Message,
  Hl7Segment,
  Hl7Field,
  Hl7Repetition,
  Hl7Component,
  Hl7Subcomponent,
  Hl7Delimiters
 } from "../models/hl7-syntax.model";

/*
@Injectable({
  providedIn: 'root'
})
export class Hl7ParserService {
  parse(input: string): Hl7Message {
    // Parse delimiters from MSH.
    // Split segments.
    // Preserve fields, repetitions, components and subcomponents.
    throw new Error('Not implemented');
  }
}
*/


@Injectable({
  providedIn: 'root'
})
export class Hl7ParserService {

  parse(input: string): Hl7Message {
    if (!input?.trim()) {
      throw new Error('HL7 message is empty.');
    }

    const normalizedInput = this.normalizeLineEndings(input);

    const rawSegments = normalizedInput
      .split('\r')
      .filter(segment => segment.length > 0);

    if (rawSegments.length === 0) {
      throw new Error('HL7 message contains no segments.');
    }

    const msh = rawSegments[0];

    if (!msh.startsWith('MSH')) {
      throw new Error('HL7 message must begin with an MSH segment.');
    }

    const delimiters = this.parseDelimiters(msh);

    const segments = rawSegments.map((segment, index) =>
      this.parseSegment(
        segment,
        index + 1,
        delimiters
      )
    );

    return {
      rawValue: normalizedInput,
      delimiters,
      segments
    };
  }

  private normalizeLineEndings(input: string): string {
    return input
      .replace(/\r\n/g, '\r')
      .replace(/\n/g, '\r');
  }

  private parseDelimiters(msh: string): Hl7Delimiters {
    if (msh.length < 8) {
      throw new Error(
        'MSH segment is too short to contain HL7 delimiters.'
      );
    }

    const field = msh.charAt(3);

    const encodingCharacters = msh.substring(4, 8);

    if (encodingCharacters.length < 4) {
      throw new Error(
        'MSH-2 must contain component, repetition, escape, and subcomponent delimiters.'
      );
    }

    return {
      field,
      component: encodingCharacters.charAt(0),
      repetition: encodingCharacters.charAt(1),
      escape: encodingCharacters.charAt(2),
      subcomponent: encodingCharacters.charAt(3),
      segment: '\r'
    };
  }

  private parseSegment(
    rawSegment: string,
    sequence: number,
    delimiters: Hl7Delimiters
  ): Hl7Segment {

    const segmentId = rawSegment.substring(0, 3);

    if (segmentId.length !== 3) {
      throw new Error(
        `Invalid segment at sequence ${sequence}: "${rawSegment}"`
      );
    }

    const fields =
      segmentId === 'MSH'
        ? this.parseMshFields(rawSegment, delimiters)
        : this.parseStandardFields(rawSegment, delimiters);

    return {
      id: segmentId,
      sequence,
      rawValue: rawSegment,
      fields
    };
  }

  private parseStandardFields(
    rawSegment: string,
    delimiters: Hl7Delimiters
  ): Hl7Field[] {

    const parts = rawSegment.split(delimiters.field);

    /*
     * parts[0] is the segment ID.
     *
     * Example:
     *
     * PID|1||12345
     *
     * parts:
     * [0] PID
     * [1] 1
     * [2] ''
     * [3] 12345
     */
    return parts
      .slice(1)
      .map((rawValue, index) =>
        this.parseField(
          rawValue,
          index + 1,
          delimiters
        )
      );
  }

  private parseMshFields(
    rawSegment: string,
    delimiters: Hl7Delimiters
  ): Hl7Field[] {

    const parts = rawSegment.split(delimiters.field);

    const fields: Hl7Field[] = [];

    /*
     * MSH-1 is the field separator itself.
     */
    fields.push(
      this.parseField(
        delimiters.field,
        1,
        delimiters
      )
    );

    /*
     * Because split('|') gives:
     *
     * [0] MSH
     * [1] ^~\&
     * [2] EPIC
     *
     * parts[1] is actually MSH-2.
     */
    parts
      .slice(1)
      .forEach((rawValue, index) => {
        fields.push(
          this.parseField(
            rawValue,
            index + 2,
            delimiters
          )
        );
      });

    return fields;
  }

  private parseField(
    rawValue: string,
    position: number,
    delimiters: Hl7Delimiters
  ): Hl7Field {

    const repetitions = rawValue
      .split(delimiters.repetition)
      .map(repetition =>
        this.parseRepetition(
          repetition,
          delimiters
        )
      );

    return {
      position,
      rawValue,
      repetitions
    };
  }

  private parseRepetition(
    rawValue: string,
    delimiters: Hl7Delimiters
  ): Hl7Repetition {

    const components = rawValue
      .split(delimiters.component)
      .map(component =>
        this.parseComponent(
          component,
          delimiters
        )
      );

    return {
      rawValue,
      components
    };
  }

  private parseComponent(
    rawValue: string,
    delimiters: Hl7Delimiters
  ): Hl7Component {

    const subcomponents = rawValue
      .split(delimiters.subcomponent)
      .map(subcomponent =>
        this.parseSubcomponent(subcomponent)
      );

    return {
      rawValue,
      subcomponents
    };
  }

  private parseSubcomponent(
    rawValue: string
  ): Hl7Subcomponent {

    return {
      rawValue
    };
  }
}