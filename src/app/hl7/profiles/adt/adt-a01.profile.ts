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
				segmentId: 'PID',
				name: '',
				usage: 'R',
				minOccurrences: 1,
				maxOccurrences: 1,
				fields: [
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
					}
				]
			}
		]
	};