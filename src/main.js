import { createHeader } from './components/header/header.js';
import { createMorseBox } from './components/morse-box/morse-box.js';
import { createPracticePanel } from './components/practice-panel/practice-panel.js';
import { bindPracticeTab } from './components/morse-box/practice-tab.js';
import { createAmbient } from './components/ambient/ambient.js';
import { createPageControls } from './components/page-controls/page-controls.js';
import { bindAmbientParallax } from './components/ambient/ambient-parallax.js';

const app = document.getElementById('app');

const pageControls = createPageControls();

const ambient = createAmbient();

app.prepend(ambient);

bindAmbientParallax(
	app,
	ambient.querySelector('.ambient__scene')
);

const workspace = document.createElement('main');
workspace.className = 'workspace';

const box = createMorseBox();
const practice = createPracticePanel();

const tab = box.querySelector('.morse-box__tab');

let isPracticeOpen = false;

tab.setAttribute('aria-controls', practice.element.id);
tab.setAttribute('aria-expanded', 'false');

function togglePractice() {
	isPracticeOpen = !isPracticeOpen;
	
	workspace.classList.toggle(
		'is-practice-open',
		isPracticeOpen
	);
	
	practice.element.inert = !isPracticeOpen;
	
	tab.setAttribute('aria-expanded', String(isPracticeOpen));
	
	tab.setAttribute(
		'aria-label',
		isPracticeOpen ? 'Close practice mode' : 'Open practice mode'
	);
}

bindPracticeTab(tab, {
	isOpen: () => isPracticeOpen,
	onToggle: togglePractice
});

box.addEventListener('morse-letter', (event) => {
	practice.appendLetter(event.detail.letter);
});

practice.element.addEventListener('practice-space-request', () => {
	box.dispatchEvent(new CustomEvent('morse-space-request'));
});

box.addEventListener('morse-space', () => {
	practice.appendSpace();
});

workspace.append(practice.element, box);

app.append(createHeader(), workspace, pageControls);