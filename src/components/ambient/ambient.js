import { createLandscape } from '../landscape/landscape.js';

export function createAmbient() {
	const ambient = document.createElement('div');
	
	ambient.className = 'ambient';
	ambient.setAttribute('aria-hidden', 'true');
	
	ambient.innerHTML = `
        <div class="ambient__scene">
            <div class="ambient__sky ambient__sky--day"></div>
            <div class="ambient__sky ambient__sky--night"></div>

            <div class="ambient__sun"></div>
            <div class="ambient__moon"></div>
        </div>
    `;
	
	const scene = ambient.querySelector('.ambient__scene');
	
	scene.append(createLandscape());
	
	return ambient;
}