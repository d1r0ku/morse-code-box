import { createMorseDiagram } from './morse-diagram.js';
import { bindMorseInput } from './morse-input.js';
import { createMorseAudio } from '../../morse/audio.js';
import { createMorseDecoder } from '../../morse/decoder.js';
export function createMorseBox() {
	const box = document.createElement('section');
	
	box.className = 'morse-box';
	box.setAttribute('aria-label', 'Morse code device');
	
	box.innerHTML = `
        <div class="morse-box__diagram"></div>

        <div class="morse-box__controls">
            <button
                class="morse-box__key"
                type="button"
                aria-label="Emit Morse code"
                aria-describedby="morse-key-help"
            >
                <span class="morse-box__key-center" aria-hidden="true"></span>
            </button>

            <p class="morse-box__instructions" id="morse-key-help">
                <span>Click and hold</span>
                <span>or press space and hold</span>
            </p>
        </div>

        <button
            class="morse-box__tab"
            type="button"
            aria-label="Open practice mode"
        >
            <svg
			    class="morse-box__tab-icon"
			    viewBox="0 0 24 24"
			    aria-hidden="true"
			    focusable="false"
			>
			    <path d="M 4 12 H 20 M 13 5 L 20 12 L 13 19" />
			</svg>
        </button>
    `;
	const diagram = box.querySelector('.morse-box__diagram');
	diagram.append(createMorseDiagram());
	
	const key = box.querySelector('.morse-box__key');
	const audio = createMorseAudio();
	
	const connections = box.querySelectorAll(
		'.morse-diagram__connection'
	);
	
	const nodes = box.querySelectorAll('.morse-diagram__node');
	
	const decoder = createMorseDecoder({
		onChange: ({ code, letter, complete }) => {
			connections.forEach((connection) => {
				const isOnPath = code.startsWith(connection.dataset.code);
				
				connection.classList.toggle('is-active', isOnPath);
			});
			
			nodes.forEach((node) => {
				const isOnPath = code.startsWith(node.dataset.code);
				const isCurrent = code === node.dataset.code;
				
				node.classList.toggle('is-active', isOnPath);
				node.classList.toggle('is-current', isCurrent);
				node.classList.toggle(
					'is-confirmed',
					complete && isCurrent
				);
			});
			
			const isInvalid = code !== '' && letter === null;
			
			box.classList.toggle('has-invalid-code', isInvalid);
		},
		
		onLetter: ({ letter, code }) => {
			box.dispatchEvent(new CustomEvent('morse-letter', {
				bubbles: true,
				detail: { letter, code }
			}));
		}
	});
	
	box.addEventListener('morse-space-request', () => {
		const canInsertSpace = decoder.flush();
		
		if (!canInsertSpace) return;
		
		box.dispatchEvent(new CustomEvent('morse-space', {
			bubbles: true
		}));
	});
	
	bindMorseInput(key, {
		onStart: () => {
			decoder.start();
			audio.start();
		},
		
		onEnd: () => {
			audio.stop();
			decoder.stop();
		},
		
		onCancel: () => {
			audio.stop();
			decoder.reset();
		}
	});
	
	function resetWhenHidden() {
		if (document.hidden) {
			audio.stop();
			decoder.reset();
		}
	}
	
	window.addEventListener('blur', () => {
		audio.stop();
		decoder.reset();
	});
	
	document.addEventListener('visibilitychange', resetWhenHidden);
	
	return box;
}