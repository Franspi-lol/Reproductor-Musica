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

let longRoad = new Canciones(
  "Love is a long road",
  "Tom Petty",
  "./Tom-Petty-Love-Is-A-Long-Road-From-Grand-Theft-Auto-VI-(Celebnob.com).mp3",
  "./img/longRoad.png"
);

let fire = new Canciones(
  "This Fffire",
  "Franz Ferdinand",
  "./fffire.mp3",
  "./img/fffire.jpg"
);

let dreamOn = new Canciones(
  "Dream On",
  "Aerosmith",
  "./Aerosmith-Dream-On-(Gospeljingle.com).mp3",
  "./img/dreamOn.jpg"
);

let iDontWantToMissAThing = new Canciones(
  "I Don't Want To Miss A Thing",
  "Aerosmith",
  "./I_Dont_Wanna_Miss_a_Thing.mp3",
  "./img/Idontwanttomissathing.jpg"
);

let audioArray = [risingSun, longRoad, fire, dreamOn, iDontWantToMissAThing];

document.addEventListener("DOMContentLoaded", function () {
  /* botones */
  let play = document.getElementById("play");
  let stop = document.getElementById("stop");
  let volume = document.getElementById("volume-slider");
  let next = document.getElementById("next");
  let previous = document.getElementById("previous");
  let durationSlider = document.getElementById("duration-slider");
  let currentTime = document.getElementById("currentTime");
  let durationTime = document.getElementById("totalTime");

  /*datos cancion*/
  let titulo = document.getElementById("titulo");
  let artista = document.getElementById("artista");
  let portada = document.getElementById("portada");

  let arrayPosition = 0;

  let audio = setAudio(audioArray[0]);
  setData(audioArray[0]);

  

  durationSlider.addEventListener("input", function () { /* slider para mover cancion */
    if (audio) {
      audio.currentTime = durationSlider.value;
    }
  });



  /* pulsar teclas para interactuar */
  document.addEventListener("keydown", function (event) {
    if (event.keyCode == 32) {
      if (audio.paused) {
        playSong(audio, durationSlider, currentTime, durationTime);
      } else {
        pauseSong(audio);
      }
    }
    if (event.keyCode == 39) {
      /*tecla derecha - modificar */
      stopSong(audio);
      arrayPosition = nextSong(audioArray.length, arrayPosition);
      audio = setAudio(audioArray[arrayPosition]);
      setData(audioArray[arrayPosition]);
      
    }
    if (event.keyCode == 37) {
      /*tecla izquierda - modificar */
      stopSong(audio);
      arrayPosition = previousSong(audioArray.length, arrayPosition);
      audio = setAudio(audioArray[arrayPosition]);
      setData(audioArray[arrayPosition]);
      
    }
  });

  previous.addEventListener("click", function () {
    /* cancion anterior */ stopSong(audio);
    arrayPosition = previousSong(audioArray.length, arrayPosition);
    audio = setAudio(audioArray[arrayPosition]);
    setData(audioArray[arrayPosition]);
    
  });

  next.addEventListener("click", function () {
    /* cancion siguiente */ stopSong(audio);
    arrayPosition = nextSong(audioArray.length, arrayPosition);
    audio = setAudio(audioArray[arrayPosition]);
    setData(audioArray[arrayPosition]);
    
  });

  volume.addEventListener("input", function (e) {
    /* barra volumen */ audio.volume = e.currentTarget.value / 100;
  });

  play.addEventListener("click", function () {
    /* boton play/pausa */ if (audio.paused) {
      playSong(audio, durationSlider, currentTime, durationTime);
    } else {
      pauseSong(audio);
    }
  });

  stop.addEventListener("click", function () {
    /* stop */ stopSong(audio);
  });
});

function playSong(audio, durationSlider, currentTime, durationTime) {
  /* esta la habilidad de mover la barra junto a la cancion */
  audio.play();
  durationSlider.min = 0;
  durationSlider.max = audio.duration;
  audio.ontimeupdate = function () {
    durationSlider.value = audio.currentTime;
    /* console.log(audio.currentTime); */

    currentTime.innerHTML = Math.floor(audio.currentTime / 60) + ":" + Math.floor(audio.currentTime % 60);
    durationTime.innerHTML = Math.floor(audio.duration / 60) + ":" + Math.floor(audio.duration % 60);
    
  };
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

function nextSong(arraySize, arrayPosition) {
  if (arrayPosition < arraySize - 1) {
    return arrayPosition + 1;
  } else {
    return 0;
  }
}
function previousSong(arraySize, arrayPosition) {
  if (arrayPosition > 0) {
    return arrayPosition - 1;
  } else {
    return arraySize - 1;
  }
}
