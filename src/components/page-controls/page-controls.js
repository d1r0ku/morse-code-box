const storageKey = 'morse-code-box-theme';

function getInitialTheme() {
	try {
		const savedTheme = localStorage.getItem(storageKey);
		
		if (savedTheme === 'dark' || savedTheme === 'light') {
			return savedTheme;
		}
	} catch {
		// el tema funciona aunque el almacenamiento no esté disponible
	}
	
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
}

export function createPageControls() {
	const controls = document.createElement('div');
	
	controls.className = 'page-controls';
	
	controls.innerHTML = `
        <button
            class="page-controls__theme"
            type="button"
        ></button>
		
		<a
		    class="page-controls__repo"
		    href="https://github.com/d1r0ku/morse-code-box"
		    target="_blank"
		    rel="noopener noreferrer"
		    aria-label="Version 1 — View source code on GitHub"
		>
		    v1 — repo
		</a>
    `;
	
	const themeButton = controls.querySelector(
		'.page-controls__theme'
	);
	
	let theme = getInitialTheme();
	
	function applyTheme() {
		const isDark = theme === 'dark';
		
		document.body.classList.toggle('dark', isDark);
		
		themeButton.textContent = isDark ? 'Day' : 'Night';
		
		themeButton.setAttribute(
			'aria-label',
			isDark ? 'Switch to day mode' : 'Switch to night mode'
		);
	}
	
	themeButton.addEventListener('click', () => {
		theme = theme === 'dark' ? 'light' : 'dark';
		
		applyTheme();
		
		try {
			localStorage.setItem(storageKey, theme);
		} catch {
			// no es necesario guardar el tema para poder cambiarlo
		}
	});
	
	applyTheme();
	
	return controls;
}
