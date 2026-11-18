export function bindAmbientParallax(frame, scene) {
	const enabled = window.matchMedia(
		'(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)'
	);
	
	const maxMovement = 8;
	
	let currentX = 0;
	let currentY = 0;
	
	let targetX = 0;
	let targetY = 0;
	
	let animationId = null;
	
	function render() {
		scene.style.setProperty('--scene-x', `${currentX}px`);
		scene.style.setProperty('--scene-y', `${currentY}px`);
	}
	
	function animate() {
		currentX += (targetX - currentX) * 0.08;
		currentY += (targetY - currentY) * 0.08;
		
		const isSettled = (
			Math.abs(targetX - currentX) < 0.02
			&& Math.abs(targetY - currentY) < 0.02
		);
		
		if (isSettled) {
			currentX = targetX;
			currentY = targetY;
		}
		
		render();
		
		animationId = isSettled
			? null
			: requestAnimationFrame(animate);
	}
	
	function scheduleAnimation() {
		if (animationId !== null) return;
		
		animationId = requestAnimationFrame(animate);
	}
	
	function returnToCenter() {
		targetX = 0;
		targetY = 0;
		
		scheduleAnimation();
	}
	
	frame.addEventListener('pointermove', (event) => {
		if (!enabled.matches) return;
		if (event.pointerType !== 'mouse') return;
		if (event.buttons !== 0) return;
		
		const bounds = frame.getBoundingClientRect();
		
		const normalizedX = Math.max(
			-1,
			Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1)
		);
		
		const normalizedY = Math.max(
			-1,
			Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1)
		);
		
		targetX = -normalizedX * maxMovement;
		targetY = -normalizedY * maxMovement;
		
		scheduleAnimation();
	});
	
	frame.addEventListener('pointerleave', returnToCenter);
	window.addEventListener('blur', returnToCenter);
	window.addEventListener('resize', returnToCenter);
	
	enabled.addEventListener('change', () => {
		if (animationId !== null) {
			cancelAnimationFrame(animationId);
			animationId = null;
		}
		
		currentX = 0;
		currentY = 0;
		targetX = 0;
		targetY = 0;
		
		render();
	});
}