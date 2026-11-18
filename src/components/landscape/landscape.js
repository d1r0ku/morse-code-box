export function createLandscape() {
	const landscape = document.createElement('div');
	
	landscape.className = 'landscape';
	landscape.setAttribute('aria-hidden', 'true');
	
	landscape.innerHTML = `
        <svg
            class="landscape__drawing"
            viewBox="0 0 1600 440"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
        >
            <path
                class="landscape__hill landscape__hill--far"
                d="
                    M 0 300
                    C 180 210, 340 230, 520 300
                    S 850 350, 1060 280
                    S 1400 160, 1600 240
                    L 1600 440
                    L 0 440
                    Z
                "
            />

            <path
                class="landscape__hill landscape__hill--middle"
                d="
                    M 0 370
                    C 240 350, 390 250, 600 290
                    S 940 390, 1160 310
                    C 1250 280, 1310 260, 1370 260
                    L 1475 260
                    C 1520 260, 1560 280, 1600 300
                    L 1600 440
                    L 0 440
                    Z
                "
            />

            <path
                class="landscape__path"
                d="
                    M 1411 258
                    L 1425 258
                    C 1410 294, 1460 308, 1390 344
                    C 1330 375, 1320 410, 1360 440
                    L 1285 440
                    C 1260 401, 1300 362, 1360 335
                    C 1420 307, 1388 290, 1411 258
                    Z
                "
            />

            <g class="landscape__house">
                <path
                    class="landscape__house-side"
                    d="M 1462 160 L 1484 174 L 1484 260 L 1462 260 Z"
                />

                <path
                    class="landscape__house-wall"
                    d="M 1378 160 L 1420 119 L 1462 160 L 1462 260 L 1378 260 Z"
                />
                
                <path
				    class="landscape__house-roof-side"
				    d="
				        M 1420 110
				        L 1442 124
				        L 1493 176
				        L 1484 182
				        L 1462 168
				        Z
				    "
				/>

                <path
                    class="landscape__house-roof"
                    d="M 1369 162 L 1420 110 L 1471 162 L 1462 168 L 1420 126 L 1378 168 Z"
                />

                <rect
                    class="landscape__window"
                    x="1391" y="171"
                    width="15" height="22"
                />

                <rect
                    class="landscape__window landscape__window--lit"
                    x="1433" y="171"
                    width="15" height="22"
                />

                <rect
                    class="landscape__window"
                    x="1391" y="215"
                    width="15" height="21"
                />

                <rect
                    class="landscape__window"
                    x="1433" y="215"
                    width="15" height="21"
                />

                <rect
                    class="landscape__door"
                    x="1412" y="226"
                    width="15" height="34"
                />

                <path
                    class="landscape__window-frames"
                    d="
                        M 1398.5 171 V 193
                        M 1391 182 H 1406

                        M 1440.5 171 V 193
                        M 1433 182 H 1448

                        M 1398.5 215 V 236
                        M 1391 225.5 H 1406

                        M 1440.5 215 V 236
                        M 1433 225.5 H 1448
                    "
                />
            </g>

			<g
			    class="landscape__sign"
			    transform="rotate(-9 1516 294)"
			>
			    <rect
			        class="landscape__sign-post"
			        x="1513"
			        y="232"
			        width="6"
			        height="62"
			    />
			
			    <rect
			        class="landscape__sign-board"
			        x="1494"
			        y="210"
			        width="44"
			        height="44"
			        rx="3"
			        transform="rotate(45 1516 232)"
			    />
			
			    <path
			        class="landscape__sign-arrow"
			        d="
			            M 1516 217
			            L 1504 231
			            L 1512 231
			            L 1512 246
			            L 1520 246
			            L 1520 231
			            L 1528 231
			            Z
			        "
			    />
			</g>

            <path
                class="landscape__hill landscape__hill--front"
                d="
                    M 0 385
                    C 200 300, 380 340, 580 390
                    S 940 390, 1090 375
                    C 1260 360, 1430 405, 1600 355
                    L 1600 440
                    L 0 440
                    Z
                "
            />
        </svg>
    `;
	
	return landscape;
}