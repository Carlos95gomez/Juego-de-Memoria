// Objeto con las imágenes para cada categoría
const imagenes = {
    aircraft: [
        'https://cdn.pixabay.com/photo/2017/12/11/11/30/helicopter-3011983_960_720.jpg',
        'https://cdn.pixabay.com/photo/2015/05/31/19/16/apache-792579_960_720.jpg',
        'https://cdn.pixabay.com/photo/2023/06/16/13/30/md500-8068034_960_720.jpg',
        'https://cdn.pixabay.com/photo/2022/09/28/20/35/eurocopter-tiger-7485961_960_720.jpg',
        'https://cdn.pixabay.com/photo/2022/09/22/20/40/helicopter-7473100_960_720.jpg',
        'https://cdn.pixabay.com/photo/2012/10/26/01/34/aircraft-63028_1280.jpg',
        'https://cdn.pixabay.com/photo/2022/10/06/18/56/saab-jas-39-gripen-7503419_960_720.jpg',
        'https://cdn.pixabay.com/photo/2019/10/04/03/54/f-a-18a-hornet-4524706_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/07/14/21/56/colombian-air-force-2505094_960_720.jpg',
        'https://cdn.pixabay.com/photo/2020/08/23/17/27/dc-3-5511454_960_720.jpg'
    ],
    ships: [
        'https://cdn.pixabay.com/photo/2019/07/24/00/14/tall-ships-4358926_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/07/24/06/56/uss-gabrielle-giffords-lcs-10-2533752_960_720.jpg',
        'https://cdn.pixabay.com/photo/2022/03/17/14/33/warship-7074786_960_720.jpg',
        'https://cdn.pixabay.com/photo/2020/04/02/16/54/boat-4995864_960_720.jpg',
        'https://cdn.pixabay.com/photo/2018/01/28/10/11/body-of-water-3113205_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/07/06/10/22/uss-nimitz-2477556_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/09/23/11/21/uss-harry-s-2778527_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/06/22/09/42/uss-wayne-e-2430118_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/08/11/05/01/marine-2629714_960_720.jpg',
        'https://cdn.pixabay.com/photo/2021/09/16/21/27/container-ship-6631117_960_720.jpg'
    ],
    tanks: [
        'https://cdn.pixabay.com/photo/2021/06/22/10/28/main-battle-tank-6355779_960_720.jpg',
        'https://cdn.pixabay.com/photo/2014/09/17/18/05/tank-449772_960_720.jpg',
        'https://cdn.pixabay.com/photo/2015/10/26/14/36/tank-1007256_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/04/30/12/57/tank-2272806_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/07/25/19/01/m1a1-abrams-2539174_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/07/26/02/20/lav-25-2540218_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/07/28/21/12/humvee-2549808_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/07/21/18/40/us-army-2526753_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/08/21/20/33/army-engineers-2666796_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/07/21/19/58/united-states-army-2526940_960_720.jpg'
    ]
};

// Variables globales
let categoriaActual = 'aircraft';
let cartasVolteadas = [];
let parejasEncontradas = 0;
let movimientos = 0;
let tiempo = 0;
let intervaloTiempo;
let procesando = false;

// Función para mezclar un array
function mezclar(array) {
    let indiceActual = array.length;
    while (indiceActual !== 0) {
        const indiceAleatorio = Math.floor(Math.random() * indiceActual);
        indiceActual--;
        [array[indiceActual], array[indiceAleatorio]] = [array[indiceAleatorio], array[indiceActual]];
    }
    return array;
}

// Función para crear el tablero de juego
function crearTablero() {
    const tableroJuego = document.getElementById('tableroJuego');
    tableroJuego.innerHTML = '';
    
    // Crear pares de cartas
    const imagenesSeleccionadas = imagenes[categoriaActual].slice(0, 10);
    const parejaCartas = [...imagenesSeleccionadas, ...imagenesSeleccionadas];
    const cartasMezcladas = mezclar(parejaCartas);

    cartasMezcladas.forEach((img, indice) => {
        const carta = document.createElement('div');
        carta.className = 'carta';
        carta.innerHTML = `
            <div class="carta-frente">?</div>
            <div class="carta-reverso">
                <img src="${img}" alt="Carta ${indice + 1}">
            </div>
        `;
        carta.dataset.indice = indice;
        carta.addEventListener('click', () => voltearCarta(carta));
        tableroJuego.appendChild(carta);
    });
}

// Función para voltear una carta
function voltearCarta(carta) {
    if (procesando || carta.classList.contains('volteada') || cartasVolteadas.includes(carta)) {
        return;
    }

    carta.classList.add('volteada');
    cartasVolteadas.push(carta);

    if (cartasVolteadas.length === 2) {
        procesando = true;
        movimientos++;
        document.getElementById('movimientos').textContent = movimientos;
        
        const [carta1, carta2] = cartasVolteadas;
        const img1 = carta1.querySelector('img').src;
        const img2 = carta2.querySelector('img').src;

        if (img1 === img2) {
            parejasEncontradas++;
            document.getElementById('parejas').textContent = parejasEncontradas;
            cartasVolteadas = [];
            procesando = false;

            if (parejasEncontradas === 10) {
                clearInterval(intervaloTiempo);
                setTimeout(() => {
                    alert(`¡Felicitaciones! Has completado el juego en ${tiempo} segundos con ${movimientos} movimientos.`);
                }, 500);
            }
        } else {
            setTimeout(() => {
                carta1.classList.remove('volteada');
                carta2.classList.remove('volteada');
                cartasVolteadas = [];
                procesando = false;
            }, 1000);
        }
    }
}

// Función para actualizar el temporizador
function actualizarTemporizador() {
    tiempo++;
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;
    document.getElementById('temporizador').textContent = 
        `${minutos}:${segundos.toString().padStart(2, '0')}`;
}

// Función para cambiar de categoría
function cambiarCategoria(categoria) {
    categoriaActual = categoria;
    reiniciarJuego();
}

// Función para reiniciar el juego
function reiniciarJuego() {
    clearInterval(intervaloTiempo);
    tiempo = 0;
    movimientos = 0;
    parejasEncontradas = 0;
    cartasVolteadas = [];
    document.getElementById('temporizador').textContent = '0:00';
    document.getElementById('movimientos').textContent = '0';
    document.getElementById('parejas').textContent = '0';
    crearTablero();
    intervaloTiempo = setInterval(actualizarTemporizador, 1000);
}

// Iniciar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', reiniciarJuego);