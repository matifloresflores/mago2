const songList = [
  {
    title: "1.Nos han robalo la primavera",
    file: "L (1).mp3",
  },
  {
    title: "2.No me digas adiós",
    file: "L (2).mp3",
  },
  {
    title: "3.si supieras",
    file: "L (3).mp3",
  },
  {
    title: "4.Espera en el cielo",
    file: "L (4).mp3",
  },
  {
    title: "5.Quiero morirme en ti ",
    file: "L (5).mp3",
  },
  {
    title: "6.María Soliña",
    file: "L (6).mp3",
  },
  {
    title: "7.Todo lo que soy",
    file: "L (7).mp3",
  },
  {
    title: "8.Siempre - Diabulus in opera y",
    file: "L (8).mp3",
  },
  {
    title: "9.Moriré siendo de ti ",
    file: "L (9).mp3",
  },
  {
    title: "10.Augas do río - con Luar na Lubre - inédito",
    file: "L (10).mp3",
  },
  {
    title: "11.El templo del adiós - versión piano 2022",
    file: "L (11).mp3",
  },
  {
    title: "12.Desde mi cielo - con Leo Jiménez - versión orquestal",
    file: "L (12).mp3",
  },
  {
    title: "13.Noche en la Toscana - versión instrumental - demo inédita",
    file: "L (13).mp3",
  },
  {
    title: "14.Epílogo",
    file: "L (14).mp3",
  },
  {
    title: "15.Quiero que apagues mi luz",
    file: "L (15).mp3",
  }

];

let tec = false;
let actualSong = null;

const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const searchInput = document.getElementById("search");

audio.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

next.addEventListener("click", () => nextSong());
prev.addEventListener("click", () => prevSong());

searchInput.addEventListener("input", loadSongs);

function loadSongs() {
  const songsList = document.getElementById("songs");

  songsList.innerHTML = "";
  
  const filteredSongs = songList.filter((song, index) => {
    return song.title.toLowerCase().includes(searchInput.value.toLowerCase());
  });

  filteredSongs.forEach((song, index) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = song.title;
    link.href = "#";
    link.addEventListener("click", () => loadSong(index));
    li.appendChild(link);
    songsList.appendChild(li);
  });
}

function loadSong(songIndex) {
  if (songIndex !== actualSong) {
    changeActiveClass(actualSong, songIndex);
    actualSong = songIndex;
    audio.src = "./audio/" + songList[songIndex].file;
    playSong();
    changeSongtitle(songIndex);
  }
}

function updateProgress(event) {
  const { duration, currentTime } = event.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = percent + "%";
}

function updateControls() {
  if (audio.paused) {
    play.classList.remove("fa-pause");
    play.classList.add("fa-play");
  } else {
    play.classList.add("fa-pause");
    play.classList.remove("fa-play");
  }
}

function playSong() {
  if (actualSong !== null) {
    audio.play();
    updateControls();
  }
}

function pauseSong() {
  audio.pause();
  updateControls();
}

function changeActiveClass(lastIndex, newIndex) {
  const links = document.querySelectorAll("a");
  if (lastIndex !== null) {
    links[lastIndex].classList.remove("active");
  }
  links[newIndex + 1].classList.add("active");
}

function changeSongtitle(songIndex) {
  title.innerText = songList[songIndex].title;
}

function prevSong() {
  if (actualSong > 0) {
    loadSong(actualSong - 1);
  } else {
    loadSong(songList.length - 1);
  }
}

function nextSong() {
  if (actualSong < songList.length - 1) {
    loadSong(actualSong + 1);
  } else {
    loadSong(0);
  }
}

document.addEventListener("keyup", (Event) => {
  if (Event.key == " ") {
    if (tec) {
      audio.play();
      play.classList.add("fa-pause");
      play.classList.remove("fa-play");
      tec = false;
    } else {
      audio.pause();
      play.classList.remove("fa-pause");
      play.classList.add("fa-play");
      tec = true;
    }
  }
});

loadSongs();
