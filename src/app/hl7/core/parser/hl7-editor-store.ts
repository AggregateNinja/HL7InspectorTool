import { computed, inject, Injectable, signal } from "@angular/core";
import { Hl7ParserService } from "./hl7-parser.service";
import { Hl7Message } from "../models/hl7-syntax.model";
import { Hl7Location } from "../models/hl7-location.model";
import { Hl7ValidatorService } from "../validation/hl7-validator.service";
import { Hl7MessageProfile } from "../../profiles/models/hl7-message-definition.model";

@Injectable()
export class Hl7EditorStore {

  private readonly parser = inject(Hl7ParserService);
  private readonly validator = inject(Hl7ValidatorService);

  readonly sourceText = signal('');
  readonly message = signal<Hl7Message | null>(null);

  readonly profile = signal<Hl7MessageProfile | null>(null);

  readonly selectedLocation = signal<Hl7Location | null>(null);
  readonly dirty = signal(false);

  readonly validationIssues = computed(() => {
    const message = this.message();
    const profile = this.profile();

    if (!message) {
      return [];
    }

    return this.validator.validate(
      message,
      profile ?? undefined
    );
  });

  load(
    source: string,
    profile?: Hl7MessageProfile
  ): void {

    const message = this.parser.parse(source);

    this.sourceText.set(source);
    this.message.set(message);
    this.profile.set(profile ?? null);
    this.dirty.set(false);
  }
}