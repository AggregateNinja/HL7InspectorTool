HL7 Inspector Tool Installation

- npm install -g @angular/cli
- ng new HL7InspectorTool
	- Which stylesheet system would you like to use? CSS
	- Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? No
	- Which AI tools do you want to configure with Angular best practices? https://angular.dev/ai/develop-with-ai None
- npm install bootstrap
- ng add @ng-bootstrap/ng-bootstrap
- npm install @fortawesome/fontawesome-free
- npm install prismjs
- npm install nodehl7
	- npm install --save-dev patch-package
	- Edit: node_modules/nodehl7/dist/esm/segments/index.ts
	- Change: export { SegmentInfo } from './types';
		- To: export type { SegmentInfo } from './types';
	- npx patch-package nodehl7
	- Add to package.json:
		- "scripts": {
		  "postinstall": "patch-package"
		}
	- npm install
- ng serve

TODO

A few features that would make it especially useful:

- Paste an HL7 message and parse it instantly.
- Hover over PID-5 or OBX-3 to display the official HL7 field name and data type.
- Expand components (^), repetitions (~), and subcomponents (&) in a tree.
- Color-code different segment types.
- Search for fields by name (e.g., "Patient Name" → PID-5).
- Compare two messages side by side with differences highlighted.
- Optionally export the parsed message as JSON for debugging or documentation.