import { Hl7MessageProfile } from '../../profiles/models/hl7-message-definition.model';

export const ATLANTICARE_ADT_A01_PROFILE: Hl7MessageProfile = {
		id: 'ATLANTICARE_ADT_A01',
		name: 'ATLANTICARE_ADT_A01',
		hl7Version: '2.8',
		messageCode: 'ADT',
		triggerEvent: 'A01',
		messageStructure: 'ADT_A01',
		segments: [
			{
				segmentId: 'MSH',
				name: '',
				usage: 'R',
				minOccurrences: 1,
				maxOccurrences: 1,
				fields: [
					{
					path: 'MSH-1',
					name: 'Field Separator',
					dataType: 'CX',
					usage: 'R',
					minRepetitions: 1
					},
					{
					path: 'MSH-2',
					name: 'Encoding Characters',
					dataType: 'CX',
					usage: 'R',
					minRepetitions: 1
					},
					{
					path: 'MSH-3',
					name: 'Sending Application',
					dataType: 'CX',
					usage: 'R',
					minRepetitions: 1
					},
					{
					path: 'MSH-4',
					name: 'Sending Facility',
					dataType: 'CX',
					usage: 'R',
					minRepetitions: 1
					},
					{
					path: 'MSH-5',
					name: 'Receiving Application',
					dataType: 'XPN',
					usage: 'R',
					minRepetitions: 1
					},
					{
					path: 'MSH-6',
					name: 'Receiving Facility',
					dataType: 'XPN',
					usage: 'R',
					minRepetitions: 1
					},
					{
					path: 'MSH-7',
					name: 'Date/Time of Message',
					dataType: 'DTM',
					usage: 'RE',
					minRepetitions: 0,
					maxRepetitions: 1
					},
					{
					path: 'MSH-8',
					name: 'Security',
					dataType: 'CWE',
					usage: 'RE',
					minRepetitions: 0,
					maxRepetitions: 1
					},
					{
					path: 'MSH-9',
					name: 'Message Type',
					dataType: 'CWE',
					usage: 'RE',
					minRepetitions: 0,
					maxRepetitions: 1
					},
					{
					path: 'MSH-10',
					name: 'Message Control Id',
					dataType: 'CWE',
					usage: 'RE',
					minRepetitions: 0,
					maxRepetitions: 1
					},
					{
					path: 'MSH-11',
					name: 'Processing Id',
					dataType: 'XAD',
					usage: 'RE',
					minRepetitions: 0
					},
					{
					path: 'MSH-12',
					name: 'Version Id',
					dataType: 'XAD',
					usage: 'RE',
					minRepetitions: 0
					},
					{
					path: 'MSH-13',
					name: 'Sequence Number',
					dataType: 'XTN',
					usage: 'RE',
					minRepetitions: 0
					},
					{
					path: 'MSH-18',
					name: 'Character Set',
					dataType: 'CX',
					usage: 'R',
					minRepetitions: 1
					},
				]
			},
			{
				segmentId: 'PID',
				name: '',
				usage: 'R',
				minOccurrences: 1,
				maxOccurrences: 1,
				fields: [
					{
					path: 'PID-1',
					name: 'Set Id',
					dataType: 'CX',
					usage: 'R',
					minRepetitions: 1
					},
					{
					path: 'PID-2',
					name: 'Patient Id',
					dataType: 'CX',
					usage: 'R',
					minRepetitions: 1
					},
					{
					path: 'PID-3',
					name: 'Patient Identifier List',
					dataType: 'CX',
					usage: 'R',
					minRepetitions: 1
					},
					{
					path: 'PID-5',
					name: 'Patient Name',
					dataType: 'XPN',
					usage: 'R',
					minRepetitions: 1
					},
					{
					path: 'PID-7',
					name: 'Date/Time of Birth',
					dataType: 'DTM',
					usage: 'RE',
					minRepetitions: 0,
					maxRepetitions: 1
					},
					{
					path: 'PID-8',
					name: 'Administrative Sex',
					dataType: 'CWE',
					usage: 'RE',
					minRepetitions: 0,
					maxRepetitions: 1
					},
					{
					path: 'PID-11',
					name: 'Patient Address',
					dataType: 'XAD',
					usage: 'RE',
					minRepetitions: 0
					},
					{
					path: 'PID-13',
					name: 'Phone Number - Home',
					dataType: 'XTN',
					usage: 'RE',
					minRepetitions: 0
					},
					{
					path: 'PID-18',
					name: 'Patient Account Number',
					dataType: 'CX',
					usage: 'R',
					minRepetitions: 1
					},
				]
			}
		]
	};