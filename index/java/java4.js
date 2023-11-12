const songList = [
  {
      title: "1.Pensatorium",
      file: "I (1).mp3",
  },
  {
      title: "2.Melodian",
      file: "I (2).mp3",
  },
  {
      title: "3.Abracadabra",
      file: "I (3).mp3",
  },
  {
    title: "4.Vuela Alto",
    file: "I (4).mp3",
  },
  {
    title: "5.Si Supieras...",
    file: "I (5).mp3",
  },
  {
    title: "6.Pasen y Beban",
    file: "I (6).mp3",
  },
  {
    title: "7.Salvaje",
    file: "I (7).mp3",
  },
  {
    title: "8.La Viuda de O'Brian",
    file: "I (8).mp3",
  },
  {
    title: "9.Cadaveria",
    file: "I (9).mp3",
  },
  {
    title: "10.Constelación Alpha DCI",
    file: "I (10).mp3",
  },
  {
    title: "11.De La Piel Del Diablo",
    file: "I (11).mp3",
  },
  {
    title: "12.Ilussia",
    file: "I (12).mp3",
  },
  {
    title: "13.Moriré Siendo de Ti",
    file: "I (13).mp3",
  },
]

let actualSong = null;

const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")

audio.addEventListener("timeupdate", updateProgress)

play.addEventListener("click", () => {
  if (audio.paused) {
      playSong()   
  } else {
      pauseSong()
  }
})

next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())

function loadSongs() {
      songList.forEach((song, index) => {
      const li = document.createElement("li")
      const link = document.createElement("a")
      link.textContent = song.title
      link.href = "#";
      link.addEventListener("click", () => loadSong(index))
      li.appendChild(link)
      songs.appendChild(li)
  })
}

function loadSong(songIndex) {
  if (songIndex !== actualSong) {
      changeActiveClass(actualSong, songIndex)
      actualSong = songIndex
      audio.src = "./audio/" + songList[songIndex].file
      playSong()
      changeSongtitle(songIndex)
  }
}

function updateProgress(event) {
  const {duration, currentTime} = event.srcElement
  const percent = (currentTime / duration) * 100
  progress.style.width = percent + "%" 
}

function updateControls() {
  if (audio.paused) {
      play.classList.remove("fa-pause")
      play.classList.add("fa-play")
  } else {
      play.classList.add("fa-pause")
      play.classList.remove("fa-play")
  }
}

function playSong() {
  if (actualSong !== null) {
      audio.play()
      updateControls()
  }
}

function pauseSong() {
  audio.pause()
  updateControls()
}

function changeActiveClass(lastIndex, newIndex) {
  const links = document.querySelectorAll("a")
  if (lastIndex !== null) {
      links[lastIndex].classList.remove("active")
  }
  links[newIndex].classList.add("active")
}
function changeSongtitle(songIndex) {
   title.innerText = songList[songIndex].title
}

function prevSong() {
  if (actualSong > 0) {
      loadSong(actualSong - 1)
  } else {
      loadSong(songList.length - 1)
  }
}

function nextSong() {
  if (actualSong < songList.length -1) {
      loadSong(actualSong + 1)
  } else {
      loadSong(0)
  }
}
document.addEventListener("keyup",(Event)=>{

  if(Event.key==' '){
    if(tec){
      audio.play();
      play.classList.add("fa-pause")
      play.classList.remove("fa-play")
      tec=false;
    }
   else{
    audio.pause();
    play.classList.remove("fa-pause")
      play.classList.add("fa-play")
    tec=true;
   }
  }
  
})
loadSongs()