import { alphabet } from './alphabet.js';

const lettersByCode = Object.fromEntries(
	Object.entries(alphabet).map(([letter, code]) => [code, letter])
);

export function createMorseDecoder({
	                                   onChange,
	                                   onLetter = () => {}
                                   }) {
	const dashThreshold = 350;
	const letterGap = 900;
	
	let startedAt = null;
	let sequence = '';
	let letterTimer = null;
	
	function notify(complete = false) {
		onChange({
			code: sequence,
			letter: lettersByCode[sequence] ?? null,
			complete
		});
	}
	
	function confirmLetter() {
		letterTimer = null;
		
		if (!sequence) return;
		
		notify(true);
		
		const letter = lettersByCode[sequence];
		
		if (letter) {
			onLetter({
				letter,
				code: sequence
			});
		}
		
		sequence = '';
	}
	
	function start() {
		clearTimeout(letterTimer);
		letterTimer = null;
		
		if (!sequence) {
			notify();
		}
		
		startedAt = performance.now();
	}
	
	function stop() {
		if (startedAt === null) return;
		
		const duration = performance.now() - startedAt;
		
		startedAt = null;
		
		sequence += duration < dashThreshold ? '.' : '-';
		
		notify();
		
		letterTimer = setTimeout(confirmLetter, letterGap);
	}
	
	function reset() {
		clearTimeout(letterTimer);
		
		letterTimer = null;
		startedAt = null;
		sequence = '';
		
		notify();
	}
	
	function flush() {
		if (startedAt !== null) return false;
		
		clearTimeout(letterTimer);
		letterTimer = null;
		
		confirmLetter();
		
		return true;
	}
	
	return { start, stop, reset, flush };
}