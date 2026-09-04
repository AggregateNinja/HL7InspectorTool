import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import {
	NgbAccordionButton,
	NgbAccordionDirective,
	NgbAccordionItem,
	NgbAccordionHeader,
	NgbAccordionToggle,
	NgbAccordionBody,
	NgbAccordionCollapse,
} from '@ng-bootstrap/ng-bootstrap/accordion';

import { Hl7ParserService } from './hl7/core/parser/hl7-parser.service';
import { Hl7Message } from './hl7/core/models/hl7-syntax.model';

import { ATLANTICARE_ADT_A01_PROFILE } from './hl7/profiles/adt/adt-a01.profile'; 


@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule,
	NgbAccordionButton,
		NgbAccordionDirective,
		NgbAccordionItem,
		NgbAccordionHeader,
		NgbAccordionToggle,
		NgbAccordionBody,
		NgbAccordionCollapse,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [DecimalPipe],
})
export class App {
	protected readonly title = signal('HL7InspectorTool');
	currYear = new Date().getFullYear();
	filter = new FormControl('', { nonNullable: true });
	hl7In = new FormControl('MSH|^~\\&|EPIC|GENERAL_HOSPITAL|LABSYSTEM|GENERAL_HOSPITAL|20260731112035||ADT^A01^ADT_A01|MSG202607310001|P|2.8\n' +
		'EVN|A01|20260731112035|||JDOE^JOHN^^^^^NPI\n' +
		'PID|1||123456789^^^GENERAL_HOSPITAL^MR~999887777^^^USSSA^SS||DOE^JANE^MARIE^^^^L||19900415|F||2106-3^White^HL70005|123 MAIN ST^^SOMERS POINT^NJ^08244^USA||(609)555-1234^PRN^PH^^1^609^5551234~jane.doe@email.com^NET^Internet||ENG^English^HL70296|M|CHR^Christian^HL70006|123456789|987654321\n' +
		'PD1|||FAMILY PRACTICE ASSOCIATES\n' +
		'NK1|1|DOE^JOHN|SPO^Spouse|123 MAIN ST^^SOMERS POINT^NJ^08244^USA|(609)555-9876^PRN^PH\n' +
		'PV1|1|I|3N^312^B^GENERAL_HOSPITAL||||12345^SMITH^ROBERT^^^^MD^^^^NPI||||||||||V123456789|||||||||||||||||||||||||20260731111500\n' +
		'PV2|||Routine admission\n' +
		'DG1|1||I10^Essential (primary) hypertension^ICD-10-CM||20260731|A\n' +
		'GT1|1|987654321|DOE^JOHN||123 MAIN ST^^SOMERS POINT^NJ^08244^USA|(609)555-9876\n' +
		'IN1|1|BCBSNJ|BCBS|BLUE CROSS BLUE SHIELD OF NEW JERSEY|PO BOX 1234^^NEWARK^NJ^07101||(800)555-1111||||DOE^JOHN|SPO|19900101|123456789A',
		{nonNullable: true}
	);
	hl7Out = '';

	parsedMessage?: Hl7Message;
	hl7Parser: Hl7ParserService = new Hl7ParserService;

	constructor(pipe: DecimalPipe) {
	
	}

	inspectHL7() {
		//const msg = parser.parse(this.hl7In.value);

		try {
			this.parsedMessage = this.hl7Parser.parse(this.hl7In.value);

			//console.log(this.parsedMessage);

			/* this.hl7Out += JSON.stringify(
				this.parsedMessage.segments, // this.parsedMessage,
				null,
				2
			); */

			/* this.hl7Out = "<div ngbAccordion>";
			this.parsedMessage.segments.forEach(segment => {			
				this.hl7Out += "<div ngbAccordionItem>" +
					"<h2 ngbAccordionHeader>" +
					"<button ngbAccordionButton>First</button>" +
					"</h2>" +
					"<div ngbAccordionCollapse>" +
					"<div ngbAccordionBody>" +
						"<ng-template>" + segment.rawValue + "</ng-template>" +
					"</div>" +
					"</div>" +
				"</div>";
			});
			this.hl7Out += "</div>"; */

			

		} catch (error) {
			console.error('Unable to parse HL7 message:', error);

			this.hl7Out =
			error instanceof Error
				? error.message
				: 'Unable to parse HL7 message.';
		}



		//this.hl7Out = this.hl7In.value;
		//console.log(this.hl7In.value)
	}

	getFieldName(segmentId: string, fieldPosition: number): string {
		const segmentDefinition =
			ATLANTICARE_ADT_A01_PROFILE.segments.find(
			segment => segment.segmentId === segmentId
			);

		const fieldDefinition =
			segmentDefinition?.fields.find(
			field => field.path === `${segmentId}-${fieldPosition}`
			);

		return fieldDefinition?.name ?? '';
	}
}
