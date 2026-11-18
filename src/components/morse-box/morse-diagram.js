import { alphabet } from '../../morse/alphabet.js';

const positions = [
	['T', 220, 120, 0, -28],
	['M', 130, 120, 0, -28],
	['O', 40, 120, 0, -28],
	
	['E', 360, 120, 0, -28],
	['I', 420, 120, 0, -28],
	['S', 480, 120, 0, -28],
	['H', 540, 120, 0, -28],
	
	['G', 130, 190, 35, 0],
	['Q', 40, 190, 0, 35],
	['Z', 130, 260, 35, 0],
	
	['U', 420, 190, -35, 0],
	['F', 420, 260, 35, 0],
	['V', 480, 190, 35, 0],
	
	['N', 220, 330, 35, 0],
	['K', 130, 330, 0, -28],
	['Y', 40, 330, 0, -28],
	['C', 130, 400, 35, 0],
	
	['A', 360, 330, -35, 0],
	['R', 420, 330, 0, 35],
	['L', 480, 330, 0, 35],
	
	['D', 220, 470, 35, 0],
	['X', 130, 470, -35, 0],
	['B', 220, 540, -35, 0],
	
	['W', 360, 470, -35, 0],
	['P', 420, 470, 35, 0],
	['J', 360, 540, 35, 0]
];

export function createMorseDiagram() {
	const svg = document.createElementNS(
		'http://www.w3.org/2000/svg',
		'svg'
	);
	
	svg.classList.add('morse-diagram');
	svg.setAttribute('viewBox', '-15 0 600 580');
	svg.setAttribute('role', 'img');
	svg.setAttribute(
		'aria-label',
		'Morse alphabet diagram. Circles represent dots and rectangles represent dashes.'
	);
	
	const nodes = positions.map(([letter, x, y, dx, dy]) => ({
		letter,
		code: alphabet[letter],
		x,
		y,
		dx,
		dy
	}));
	
	const connections = nodes.map((node) => {
		const parentCode = node.code.slice(0, -1);
		const parent = nodes.find((item) => item.code === parentCode);
		
		const startX = parent ? parent.x : 300;
		const startY = parent ? parent.y : 120;
		
		return `
            <line
                class="morse-diagram__connection"
                data-code="${node.code}"
                x1="${startX}"
                y1="${startY}"
                x2="${node.x}"
                y2="${node.y}"
            />
        `;
	}).join('');
	
	const symbols = nodes.map((node) => {
		const isDot = node.code.endsWith('.');
		
		const shape = isDot
			? `<circle cx="${node.x}" cy="${node.y}" r="14" />`
			: `<rect
                    x="${node.x - 23}"
                    y="${node.y - 15}"
                    width="46"
                    height="30"
                    rx="8"
               />`;
		
		const rotation = ['A', 'U', 'V', 'W', 'J'].includes(node.letter)
			? `rotate(90 ${node.x} ${node.y})`
			: '';
		
		return `
            <g
                class="morse-diagram__node"
                data-letter="${node.letter}"
                data-code="${node.code}"
            >
                <g class="morse-diagram__shape" transform="${rotation}">
                    ${shape}
                </g>

                <text
                    class="morse-diagram__letter"
                    x="${node.x + node.dx}"
                    y="${node.y + node.dy}"
                >${node.letter}</text>
            </g>
        `;
	}).join('');
	
	svg.innerHTML = `
        <g class="morse-diagram__connections">
            ${connections}
        </g>

        <g class="morse-diagram__origin">
            <path d="M 272 22 L 328 22 L 304 62 L 304 120
                     Q 300 128 296 120 L 296 62 Z" />
            <circle cx="300" cy="38" r="8" />
        </g>

        ${symbols}
    `;
	
	return svg;
}