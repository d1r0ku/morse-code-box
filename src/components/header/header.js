export function createHeader() {
	const header = document.createElement('header');
	
	header.className = 'page-header';
	
	header.innerHTML = `
        <p class="page-header__author">by soku</p>
        <h1 class="page-header__title">Morse code box</h1>
    `;
	
	return header;
}