export function createHeader() {
	const header = document.createElement('header');
	
	header.className = 'page-header';
	
	header.innerHTML = `
        <p class="page-header__author">
		    by <a
		        class="page-header__profile"
		        href="https://github.com/d1r0ku"
		        target="_blank"
		        rel="noopener noreferrer"
		    >soku</a>
		</p>
        <h1 class="page-header__title">Morse code box</h1>
    `;
	
	return header;
}
