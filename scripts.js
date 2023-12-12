class Canciones {
  constructor(titulo, artista, archivo, portada) {
    this.titulo = titulo;
    this.artista = artista;
    this.archivo = archivo;
    this.portada = portada;
  }
}

let risingSun = new Canciones(
  "House of the Rising Sun",
  "The Animals",
  "./Animals - The House Of The Rising Sun.mp3",
  "./img/risingSun.jpeg"
);

document.addEventListener("DOMContentLoaded", function () {
  let play = document.getElementById("play");
  let pause = document.getElementById("pause");
  let stop = document.getElementById("stop");
  let volume = document.getElementById("volume-slider");
  let audio = setAudio(risingSun);
  let titulo = document.getElementById("titulo");
  let artista = document.getElementById("artista");
  let portada = document.getElementById("portada");

  setData(risingSun);

  volume.addEventListener("change", function (e) {
    audio.volume = e.currentTarget.value / 100;
  });
  play.addEventListener("click", function () {
    playSong(audio);
  });

  pause.addEventListener("click", function () {
    pauseSong(audio);
  });

  stop.addEventListener("click", function () {
    stopSong(audio);
  });
});

function playSong(audio) {
  audio.play();
}

function pauseSong(audio) {
  if (!audio.paused) {
    audio.pause();
  }
}

function setAudio(cancion) {
  let audio = new Audio(cancion.archivo);
  return audio;
}

function stopSong(audio) {
  audio.pause();
  audio.currentTime = 0;
}

function setData(cancion) {
  titulo.innerHTML = cancion.titulo;
  artista.innerHTML = cancion.artista;
  portada.src = cancion.portada;
}
