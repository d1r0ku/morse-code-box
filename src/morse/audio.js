export function createMorseAudio() {
	let context = null;
	let oscillator = null;
	let gain = null;
	
	function initialize() {
		if (context) return;
		
		context = new AudioContext();
		
		oscillator = context.createOscillator();
		oscillator.type = 'sine';
		oscillator.frequency.value = 600;
		
		gain = context.createGain();
		gain.gain.value = 0;
		
		oscillator.connect(gain);
		gain.connect(context.destination);
		
		oscillator.start();
	}
	
	function start() {
		initialize();
		
		if (context.state === 'suspended') {
			context.resume().catch((error) => {
				stop();
				console.error('Could not start Morse audio:', error);
			});
		}
		
		const now = context.currentTime;
		
		gain.gain.cancelScheduledValues(now);
		gain.gain.setValueAtTime(gain.gain.value, now);
		gain.gain.linearRampToValueAtTime(0.12, now + 0.008);
	}
	
	function stop() {
		if (!context) return;
		
		const now = context.currentTime;
		
		gain.gain.cancelScheduledValues(now);
		gain.gain.setValueAtTime(gain.gain.value, now);
		gain.gain.linearRampToValueAtTime(0, now + 0.015);
	}
	
	return { start, stop };
}