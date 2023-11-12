const songList = [
  {
    title: "1. Jerusalem D.C.",
    file: "Ir (1).mp3",
},
{
    title: "2. In Eternum",
    file: "Ir (2).mp3",
},
{
    title: "3. El Amor Brujo",
    file: "Ir (3).mp3",
},
{
  title: "4. Tu Funeral",
  file: "Ir (4).mp3",
},
{
  title: "5. Ciudad Esmeralda",
  file: "Ir (5).mp3",
},
{
  title: "6. Tequila Mucho por Vivir",
  file: "Ir (6).mp3",
},
{
  title: "7. Te Traeré el Horizonte",
  file: "Ir (7).mp3",
},
{
  title: "8. Opera Mortis ",
  file: "Ir (8).mp3",
},
{
  title: "9. La Cantiga de las Brujas",
  file: "Ir (9).mp3",
},
{
  title: "10. Espera en el Cielo",
  file: "Ir (10).mp3",
},
{
  title: "11. Opus Tenebrae",
  file: "Ir (11).mp3",
},
{
  title: "12. Suspiria",
  file: "Ir (12).mp3",
},
{
  title: "13. Y que Nunca te Falte un ",
  file: "Ir (13).mp3",
},
{
  title: "14. Bajo mi Piel",
  file: "Ir (14).mp3",
},
{
  title: "15. La Triste Historia de Jimmy",
  file: "Ir (15).mp3",
},
{
  title: "16. Infinitum (Trine 2 OST Cover)",
  file: "Ir (16).mp3",
},
{
  title: "17. El Séptimo Sello",
  file: "Ir (17).mp3",
},
{
  title: "18. Ira Dei (Apocalipsis)",
  file: "Ir (18).mp3",
},

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
