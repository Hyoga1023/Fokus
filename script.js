const html = document.querySelector('html')
const botonCorto = document.querySelector('.app__card-button--corto')
const botonEnfoque = document.querySelector('.app__card-button--enfoque')
const botonLargo = document.querySelector('.app__card-button--largo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botones = document.querySelectorAll('.app__card-button')
const inputEnfoqueMusica = document.querySelector('#alternar-musica')
const musica = new Audio('./sonidos/luna-rise-part-one.mp3')
const botonIniciarPausar = document.querySelector('#start-pause')
const sonidoPlay = new Audio('./sonidos/play.wav')
const sonidoPause = new Audio('./sonidos/pause.mp3')
const sonidoBeep = new Audio('./sonidos/beep.mp3')
const buttonIcon = document.querySelector('#button-icon');
const buttonText = document.querySelector('#button-text');

let tiempoTranscurridoEnSegundos = 25 * 60;
let idIntervalo = null
let estaPausado = true

musica.loop = true

inputEnfoqueMusica.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

cambiarContexto('enfoque');

botonCorto.addEventListener('click', () => {
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
});

botonEnfoque.addEventListener('click', () => {
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
});

botonLargo.addEventListener('click', () => {
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
});

function cambiarContexto(contexto){
    botones.forEach(function(contexto){
        contexto.classList.remove('active');
    })
    
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png`)
    switch(contexto){
        case "enfoque":
            titulo.innerHTML = `
            Optimiza tu productividad,
                    <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            `
            tiempoTranscurridoEnSegundos = 25 * 60;
            break;
        case "descanso-corto":
            titulo.innerHTML=`
            ¿Qué tal tomar un respiro? 
                    <strong class="app__title-strong">¡Haz una pausa corta!</strong>
            `
            tiempoTranscurridoEnSegundos = 5 * 60;
            break;
        case "descanso-largo":
            titulo.innerHTML=`    
                Hora de volver a la superficie
                <strong class="app__title-strong">Haz una pausa larga.</strong>    
            `
            tiempoTranscurridoEnSegundos = 15 * 60;
            break;
        default:
            break;    
    }
    actualizarInterfazTemporizador();
}

function cuentaRegresiva() {
    if(tiempoTranscurridoEnSegundos <= 0){
        finalizarTemporizador()
        return
    }
    tiempoTranscurridoEnSegundos -= 1
    actualizarInterfazTemporizador()
}

function iniciarPausar(){
    if(estaPausado){
        iniciarTemporizador()
        estaPausado = false
        buttonIcon.setAttribute('src', './imagenes/pause.png');
        buttonText.textContent = 'Pausar'
        sonidoPlay.play()
    } else {
        pausarTemporizador()
        estaPausado = true
        buttonIcon.setAttribute('src', './imagenes/play_arrow.png');
        buttonText.textContent = 'Comenzar'
        sonidoPause.play()
    }
}

function iniciarTemporizador() {
    idIntervalo = setInterval(cuentaRegresiva, 1000)
}

function pausarTemporizador() {
    clearInterval(idIntervalo)
    idIntervalo = null
}
function reiniciar() {
    pausarTemporizador()
    tiempoTranscurridoEnSegundos = 25 * 60;
    actualizarInterfazTemporizador()
    estaPausado = true
    buttonIcon.setAttribute('src', './imagenes/play_arrow.png');
    buttonText.textContent = 'Comenzar'
}

function finalizarTemporizador() {
    reiniciar()
    sonidoBeep.play()
    alert('Tiempo Terminado')
}

function actualizarInterfazTemporizador() {
    const minutos = Math.floor(tiempoTranscurridoEnSegundos / 60)
    const segundos = tiempoTranscurridoEnSegundos % 60
    const tiempoFormateado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
    document.querySelector('#timer').textContent = tiempoFormateado
}

botonIniciarPausar.addEventListener('click', iniciarPausar)

document.addEventListener('DOMContentLoaded', function() {
    buttonIcon.setAttribute('src', './imagenes/play_arrow.png');
    buttonText.textContent = 'Comenzar';
    actualizarInterfazTemporizador();
  });