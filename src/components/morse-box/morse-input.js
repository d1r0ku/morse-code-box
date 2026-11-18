export function bindMorseInput(
	button,
	{ onStart, onEnd, onCancel = onEnd }
) {
	let activeSource = null;
	
	function begin(source) {
		if (activeSource !== null) return;
		
		activeSource = source;
		button.classList.add('is-pressed');
		
		onStart();
	}
	
	function finish(source) {
		if (activeSource !== source) return;
		
		activeSource = null;
		button.classList.remove('is-pressed');
		
		onEnd();
	}
	
	function cancel() {
		if (activeSource === null) return;
		
		activeSource = null;
		button.classList.remove('is-pressed');
		
		onCancel();
	}
	
	button.addEventListener('pointerdown', (event) => {
		if (!event.isPrimary || event.button !== 0) return;
		if (activeSource !== null) return;
		
		event.preventDefault();
		button.focus({ preventScroll: true });
		button.setPointerCapture(event.pointerId);
		
		begin(event.pointerId);
	});
	
	button.addEventListener('pointerup', (event) => {
		finish(event.pointerId);
	});
	
	button.addEventListener('pointercancel', (event) => {
		if (activeSource === event.pointerId) cancel();
	});
	
	button.addEventListener('lostpointercapture', (event) => {
		if (activeSource === event.pointerId) cancel();
	});
	
	window.addEventListener('keydown', (event) => {
		if (event.code !== 'Space') return;
		
		const target = event.target;
		
		const isOtherControl = target instanceof Element
		                       && target.closest(
				'input, textarea, select, button, a, [contenteditable]'
			);
		
		if (isOtherControl && target !== button) return;
		
		event.preventDefault();
		
		if (event.repeat) return;
		
		begin('keyboard');
	});
	
	window.addEventListener('keyup', (event) => {
		if (event.code !== 'Space') return;
		if (activeSource !== 'keyboard') return;
		
		event.preventDefault();
		finish('keyboard');
	});
	
	window.addEventListener('blur', cancel);
	
	document.addEventListener('visibilitychange', () => {
		if (document.hidden) cancel();
	});
}