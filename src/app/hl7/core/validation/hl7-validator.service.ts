import { Injectable } from '@angular/core';

import { Hl7Message, Hl7Segment } from '../models/hl7-syntax.model';
import { Hl7Location } from '../models/hl7-location.model';
import { Hl7ValidationIssue } from '../validation/hl7-validation-issue.model';

import { Hl7MessageProfile } from '../../profiles/models/hl7-message-definition.model';
import { Hl7SegmentDefinition } from '../../profiles/models/hl7-segment-definition.model';
import { Hl7FieldDefinition } from '../../profiles/models/hl7-field-definition.model';

@Injectable({
  providedIn: 'root'
})
export class Hl7ValidatorService {

  validate(
    message: Hl7Message,
    profile?: Hl7MessageProfile
  ): Hl7ValidationIssue[] {

    const issues: Hl7ValidationIssue[] = [];

    this.validateBasicStructure(message, issues);

    if (profile) {
      this.validateProfile(message, profile, issues);
    }

    return issues;
  }

  private validateBasicStructure(
    message: Hl7Message,
    issues: Hl7ValidationIssue[]
  ): void {

    if (!message.segments.length) {
      issues.push({
        severity: 'error',
        code: 'structure',
        message: 'HL7 message contains no segments.'
      });

      return;
    }

    const firstSegment = message.segments[0];

    if (firstSegment.id !== 'MSH') {
      issues.push({
        severity: 'error',
        code: 'structure',
        message: 'The first segment of an HL7 message must be MSH.',
        location: {
          segmentId: firstSegment.id,
          segmentOccurrence: 1
        }
      });
    }
  }

  private validateProfile(
    message: Hl7Message,
    profile: Hl7MessageProfile,
    issues: Hl7ValidationIssue[]
  ): void {

    for (const segmentDefinition of profile.segments) {
      this.validateSegmentDefinition(
        message,
        segmentDefinition,
        issues
      );
    }
  }

  private validateSegmentDefinition(
    message: Hl7Message,
    definition: Hl7SegmentDefinition,
    issues: Hl7ValidationIssue[]
  ): void {

    const matchingSegments = message.segments.filter(
      segment => segment.id === definition.segmentId
    );

    /*
     * Required segment validation
     */
    if (
      definition.minOccurrences > 0 &&
      matchingSegments.length < definition.minOccurrences
    ) {
      issues.push({
        severity: 'error',
        code: 'required',
        message:
          `${definition.segmentId} (${definition.name}) is required. ` +
          `Expected at least ${definition.minOccurrences} occurrence(s), ` +
          `but found ${matchingSegments.length}.`,
        location: {
          segmentId: definition.segmentId,
          segmentOccurrence: 1
        }
      });
    }

    /*
     * Maximum segment occurrence validation
     */
    if (
      definition.maxOccurrences !== undefined &&
      matchingSegments.length > definition.maxOccurrences
    ) {
      issues.push({
        severity: 'error',
        code: 'structure',
        message:
          `${definition.segmentId} allows a maximum of ` +
          `${definition.maxOccurrences} occurrence(s), but ` +
          `${matchingSegments.length} were found.`,
        location: {
          segmentId: definition.segmentId,
          segmentOccurrence: definition.maxOccurrences + 1
        }
      });
    }

    /*
     * Validate each occurrence individually.
     */
    matchingSegments.forEach((segment, index) => {
      this.validateSegmentFields(
        segment,
        index + 1,
        definition,
        issues
      );
    });
  }

  private validateSegmentFields(
    segment: Hl7Segment,
    segmentOccurrence: number,
    definition: Hl7SegmentDefinition,
    issues: Hl7ValidationIssue[]
  ): void {

    for (const fieldDefinition of definition.fields) {

      const fieldNumber = this.getFieldNumber(fieldDefinition.path);

      if (fieldNumber === undefined) {
        issues.push({
          severity: 'warning',
          code: 'structure',
          message:
            `Invalid field path "${fieldDefinition.path}" ` +
            `in profile definition.`
        });

        continue;
      }

      const field = segment.fields.find(
        currentField => currentField.position === fieldNumber
      );

      /*
       * Required field validation
       */
      if (fieldDefinition.usage === 'R') {

        if (!field || this.isEmpty(field.rawValue)) {
          issues.push({
            severity: 'error',
            code: 'required',
            message:
              `${fieldDefinition.path} (${fieldDefinition.name}) ` +
              `is required.`,
            location: this.createFieldLocation(
              segment.id,
              segmentOccurrence,
              fieldNumber
            )
          });

          continue;
        }
      }

      /*
       * Nothing else to validate if the field doesn't exist.
       */
      if (!field) {
        continue;
      }

      /*
       * Prohibited field validation
       */
      if (
        fieldDefinition.usage === 'X' &&
        !this.isEmpty(field.rawValue)
      ) {
        issues.push({
          severity: 'error',
          code: 'structure',
          message:
            `${fieldDefinition.path} (${fieldDefinition.name}) ` +
            `is not permitted by this profile.`,
          location: this.createFieldLocation(
            segment.id,
            segmentOccurrence,
            fieldNumber
          )
        });
      }

      /*
       * Maximum length validation
       */
      if (
        fieldDefinition.maxLength !== undefined &&
        field.rawValue.length > fieldDefinition.maxLength
      ) {
        issues.push({
          severity: 'error',
          code: 'too-long',
          message:
            `${fieldDefinition.path} (${fieldDefinition.name}) ` +
            `has a maximum length of ${fieldDefinition.maxLength}, ` +
            `but the current value is ${field.rawValue.length} characters.`,
          location: this.createFieldLocation(
            segment.id,
            segmentOccurrence,
            fieldNumber
          )
        });
      }

      /*
       * Minimum repetitions
       */
      if (
        fieldDefinition.minRepetitions > 0 &&
        field.repetitions.length < fieldDefinition.minRepetitions
      ) {
        issues.push({
          severity: 'error',
          code: 'required',
          message:
            `${fieldDefinition.path} (${fieldDefinition.name}) ` +
            `requires at least ${fieldDefinition.minRepetitions} ` +
            `repetition(s), but ${field.repetitions.length} were found.`,
          location: this.createFieldLocation(
            segment.id,
            segmentOccurrence,
            fieldNumber
          )
        });
      }

      /*
       * Maximum repetitions
       */
      if (
        fieldDefinition.maxRepetitions !== undefined &&
        field.repetitions.length > fieldDefinition.maxRepetitions
      ) {
        issues.push({
          severity: 'error',
          code: 'structure',
          message:
            `${fieldDefinition.path} (${fieldDefinition.name}) ` +
            `allows a maximum of ${fieldDefinition.maxRepetitions} ` +
            `repetition(s), but ${field.repetitions.length} were found.`,
          location: this.createFieldLocation(
            segment.id,
            segmentOccurrence,
            fieldNumber
          )
        });
      }
    }
  }

  /**
   * Converts a profile path such as:
   *
   * PID-3
   * PID-5
   * OBX-11
   *
   * into its field number.
   */
  private getFieldNumber(path: string): number | undefined {

    const match = path.match(/^[A-Z0-9]{3}-(\d+)$/);

    if (!match) {
      return undefined;
    }

    return Number(match[1]);
  }

  private createFieldLocation(
    segmentId: string,
    segmentOccurrence: number,
    field: number
  ): Hl7Location {

    return {
      segmentId,
      segmentOccurrence,
      field
    };
  }

  private isEmpty(value: string | undefined | null): boolean {
    return value === undefined ||
           value === null ||
           value.trim().length === 0;
  }
}