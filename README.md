<div align="center">

˚₊‧ ꒰ა ✦ ໒꒱ ‧₊˚

# Morse code box

### Una casa en la colina. una ventana encendida. un mensaje por enviar.

Una cajita para aprender código morse en un pequeño paisaje dreamcore.

`· — — ` `· — ` `— · — ` `·` / `· · — ` `· — — ·`

Versión 1.0 · By [Soku](https://github.com/d1r0ku)

✮ [Abrir la página](https://d1r0ku.github.io/morse-code-box/) ✮

</div>

---

## ౨ৎ ¿Qué es esto?

Una página interactiva para explorar el código morse, tocar un botón,
escuchar sus pitidos y ver cómo cada pulsación recorre un diagrama de letras.

La hice porque quería convertir un pequeño aparato que encontré en
una experiencia que pudiera usar desde el navegador.

Después apareció una casa, luego las colinas, una ventana encendida
y una señal que apunta hacia arriba.

Ahora es también el comienzo de mi pequeña colección de páginas dreamcore como mi firma.

---

## ⋆˙ Dentro de la cajita

- Emite pitidos manteniendo pulsado el botón con el mouse o el dedo,
  o usando la barra espaciadora.
- Distingue pulsaciones cortas y largas para formar puntos y rayas.
- Ilumina las conexiones y las letras del recorrido.
- Confirma cada letra después de una pausa.
- Abre un panel de práctica con una pestañita elástica.
- Muestra las letras confirmadas y permite separar palabras.
- Permite borrar el mensaje completo.
- Alterna entre día y noche y recuerda tu elección si el navegador lo permite.
- Incluye un paisaje con colinas, una casa y una ventana que se enciende de noche.
- Mueve suavemente el fondo con el mouse, sin mover los controles.
- Respeta la preferencia de movimiento reducido.

> El botón «Save» está reservado para una futura descarga del mensaje en audio.
> Todavía no está disponible.

---

## ˚ʚ♡ɞ˚ ¿Cómo se usa?

### 01 · Encuentra el ritmo

Mantén pulsado el botón de la cajita:

- Una pulsación corta forma un punto: `·`
- Una pulsación larga forma una raya: `—`

También puedes mantener la barra espaciadora cuando no estés
interactuando con otro control.

El recorrido avanza al soltar cada pulsación.

### 02 · Forma una letra

Combina puntos y rayas sin dejar una pausa demasiado larga entre ellos.

Por ejemplo:

| Letra | Código | Pulsaciones |
|:-----:|:------:|:------------|
| E | `.` | corta |
| T | `-` | larga |
| A | `.-` | corta · larga |
| N | `-.` | larga · corta |
| S | `...` | corta · corta · corta |
| O | `---` | larga · larga · larga |

Espera un momento después de la última pulsación para confirmar la letra.

### 03 · Abre el cuaderno

Haz clic en la pestaña o jálala hacia la derecha para abrir el modo práctica.

Las letras confirmadas aparecerán en el papel.

Para cerrar, haz clic de nuevo o jala en la dirección de la flecha.

### 04 · Escribe tu mensaje

- «Space» confirma una letra pendiente y añade un espacio entre palabras.
- «Delete» borra todo el mensaje.
- Cerrar el panel no borra lo escrito.
- Recargar la página sí borra el mensaje: todavía no se guarda entre visitas.

La barra espaciadora emite morse; el botón «Space» separa palabras.

---

## ✦ Un ritmo para empezar

Esta versión utiliza umbrales sencillos para facilitar la práctica:

| Acción | Interpretación |
|:-------|:---------------|
| Pulsación menor de 350 ms | Punto |
| Pulsación de 350 ms o más | Raya |
| Pausa de 900 ms tras soltar | Confirmar la letra |

Puedes empezar intentando puntos de unos 200 ms y rayas de unos 600 ms.

Estos valores son decisiones de la interfaz:
no es un evaluador estricto del ritmo del morse internacional.

Por ahora se reconocen las letras A–Z.
No se incluyen números ni signos de puntuación.

---

## ☾ El lugar al otro lado del marco

De día hay un cielo deslavado, colinas verdes y una casa de tejado rojo.

De noche el paisaje se oscurece y una ventana permanece encendida.

La señal no explica hacia dónde ir.

El fondo tiene un movimiento sutil con el mouse.
En dispositivos táctiles permanece quieto y el paralaje se desactiva
si se solicita movimiento reducido.

En pantallas estrechas, el panel de práctica aparece debajo de la caja.

---

## ⌁ ¿Cómo está hecho?

- HTML para el documento principal.
- CSS organizado por componentes.
- JavaScript con módulos nativos.
- SVG para el diagrama, el paisaje y los iconos.
- Web Audio API para generar los pitidos.
- Inter, cargada desde Google Fonts.
- Almacenamiento local para recordar el tema.

No necesita un framework ni un proceso de compilación.

### Organización

```text
morse-code-box/
├── index.html
├── README.md
├── assets/
└── src/
    ├── main.js
    ├── styles/
    ├── morse/
    │   ├── alphabet.js
    │   ├── audio.js
    │   └── decoder.js
    └── components/
        ├── header/
        ├── morse-box/
        ├── practice-panel/
        ├── page-controls/
        ├── ambient/
        └── landscape/
```

---

## ₊˚⊹ Cosas que todavía viven en el futuro (próximamente)

- [ ] Descargar el mensaje como audio MP3.
- [ ] Añadir música ambiental opcional con permisos de uso verificados.
- [ ] Incorporar un modo challenge para reconocer letras por sus sonidos.
- [ ] Seguir afinando la experiencia en pantallas pequeñas.

---

<div align="center">

˚₊ ‧꒰ა ♡ ໒꒱ ‧₊˚

#morsecode #dreamcore #nostalgic #eerie #creepy #liminal

*Teach them something before they lose their soul — YG Marley*

[Soku](https://github.com/d1r0ku) ˚˖𓍢ִ໋❀

</div>
