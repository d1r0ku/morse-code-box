export function bindPracticeTab(tab, { isOpen, onToggle }) {
	const threshold = 40;
	const dragTolerance = 6;
	
	let pointerId = null;
	let startX = 0;
	let direction = 1;
	let distance = 0;
	let hasDragged = false;
	let maxStretch = 64;
	let suppressClickUntil = 0;
	
	function update(clientX) {
		const movement = clientX - startX;
		
		if (Math.abs(movement) > dragTolerance) {
			hasDragged = true;
		}
		
		distance = Math.max(0, movement * direction);
		
		const stretch = maxStretch * (
			1 - Math.exp(-distance / 100)
		);
		
		const widthChange = direction === 1
			? stretch
			: -Math.min(8, stretch);
		
		tab.style.setProperty(
			'--tab-stretch',
			`${widthChange}px`
		);
		
		tab.classList.toggle(
			'is-ready',
			distance >= threshold
		);
	}
	
	function reset() {
		const capturedPointer = pointerId;
		
		pointerId = null;
		
		tab.classList.remove('is-dragging', 'is-ready');
		tab.style.setProperty('--tab-stretch', '0px');
		
		if (
			capturedPointer !== null
			&& tab.hasPointerCapture(capturedPointer)
		) {
			tab.releasePointerCapture(capturedPointer);
		}
	}
	
	function cancel() {
		if (pointerId === null) return;
		
		suppressClickUntil = performance.now() + 500;
		reset();
	}
	
	tab.addEventListener('pointerdown', (event) => {
		if (!event.isPrimary || event.button !== 0) return;
		if (pointerId !== null) return;
		
		pointerId = event.pointerId;
		startX = event.clientX;
		direction = isOpen() ? -1 : 1;
		
		distance = 0;
		hasDragged = false;
		suppressClickUntil = 0;
		
		const bounds = tab.getBoundingClientRect();
		
		maxStretch = Math.max(
			0,
			Math.min(64, window.innerWidth - bounds.right - 12)
		);
		
		tab.focus({ preventScroll: true });
		tab.setPointerCapture(pointerId);
		tab.classList.add('is-dragging');
	});
	
	tab.addEventListener('pointermove', (event) => {
		if (event.pointerId !== pointerId) return;
		
		update(event.clientX);
	});
	
	tab.addEventListener('pointerup', (event) => {
		if (event.pointerId !== pointerId) return;
		
		update(event.clientX);
		
		const shouldToggle = hasDragged && distance >= threshold;
		
		if (hasDragged) {
			suppressClickUntil = performance.now() + 500;
		}
		
		reset();
		
		if (shouldToggle) {
			onToggle();
		}
	});
	
	tab.addEventListener('pointercancel', (event) => {
		if (event.pointerId === pointerId) cancel();
	});
	
	tab.addEventListener('lostpointercapture', (event) => {
		if (event.pointerId === pointerId) cancel();
	});
	
	tab.addEventListener('click', (event) => {
		if (pointerId !== null) return;
		
		const isPointerClick = event.detail !== 0;
		
		if (
			isPointerClick
			&& performance.now() < suppressClickUntil
		) {
			event.preventDefault();
			return;
		}
		
		onToggle();
	});
	
	window.addEventListener('blur', cancel);
	
	document.addEventListener('visibilitychange', () => {
		if (document.hidden) cancel();
	});
}