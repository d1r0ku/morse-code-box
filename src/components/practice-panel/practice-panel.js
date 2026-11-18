export function createPracticePanel() {
	const panel = document.createElement('section');
	
	panel.className = 'practice-panel';
	panel.id = 'practice-panel';
	panel.inert = true;
	
	panel.setAttribute('aria-labelledby', 'practice-title');
	
	panel.innerHTML = `
        <div class="practice-panel__content">
            <h2 class="practice-panel__title" id="practice-title">
                Practice mode
            </h2>

            <div class="practice-panel__paper">
                <p class="practice-panel__placeholder">
                    Your message will appear here
                </p>

                <p
                    class="practice-panel__message"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                ></p>
            </div>

            <div class="practice-panel__actions">
                <button
                    class="practice-panel__button"
                    type="button"
                    data-action="delete"
                    aria-label="Delete the entire message"
                    disabled
                >
                    Delete
                </button>

				<button
				    class="practice-panel__button"
				    type="button"
				    data-action="space"
				    aria-label="Insert a space between words"
				>
				    Space
				</button>

                <button
                    class="practice-panel__button"
                    type="button"
                    disabled
                    title="Audio download is not available yet"
                >
                    Save
                </button>
            </div>
        </div>
    `;
	
	const message = panel.querySelector('.practice-panel__message');
	
	const placeholder = panel.querySelector(
		'.practice-panel__placeholder'
	);
	
	const deleteButton = panel.querySelector(
		'[data-action="delete"]'
	);
	
	const spaceButton = panel.querySelector(
		'[data-action="space"]'
	);
	
	let text = '';
	
	function render() {
		message.textContent = text;
		
		placeholder.hidden = text.length > 0;
		deleteButton.disabled = text.length === 0;
		
		message.scrollTop = message.scrollHeight;
	}
	
	function appendLetter(letter) {
		text += letter;
		render();
	}
	
	function appendSpace() {
		if (text.length === 0 || text.endsWith(' ')) return;
		
		text += ' ';
		render();
	}
	
	function clear() {
		text = '';
		render();
	}
	
	deleteButton.addEventListener('click', clear);
	
	spaceButton.addEventListener('click', () => {
		panel.dispatchEvent(new CustomEvent('practice-space-request', {
			bubbles: true
		}));
	});
	
	return {
		element: panel,
		appendLetter,
		appendSpace
	};
}