const songList = [
  {
      title: "1.The black book",
      file: "C (1).mp3",
  },
  {
      title: "2.Celtic Land",
      file: "C (2).mp3",
  },
  {
      title: "3.Pagan party",
      file: "C (3).mp3",
  },
  {
    title: "4.Vodka 'n' roll",
    file: "C (4).mp3",
  },
  {
    title: "5.Find your love",
    file: "C (5).mp3",
  },
  {
    title: "6.Satanael",
    file: "C (6).mp3",
  },
  {
    title: "7.I believe",
    file: "C (7).mp3",
  },
  {
    title: "8.Xanandra",
    file: "C (8).mp3",
  },
  {
    title: "9.Hymn",
    file: "C (9).mp3",
  },
  {
    title: "10.Diábulus in música",
    file: "C (10).mp3",
  },
  {
    title: "11.Love never dies (Tell me)",
    file: "C (11).mp3",
  },
  {
    title: "12.Fiesta pagana 2.0",
    file: "C (12).mp3",
  },
  {
    title: "13.Acércate y bésame",
    file: "C (13).mp3",
  },
  {
    title: "14.El líder 2.0",
    file: "C (14).mp3",
  },
  {
    title: "15.La costa del silencio 2.0",
    file: "C (15).mp3",
  },
  {
    title: "16.Hazme un sitio entre tu piel 2.0",
    file: "C (16).mp3",
  },
  {
    title: "17.Desde mi cielo 2.0",
    file: "C (17).mp3",
  },
  {
    title: "18.La voz dormida 2.0",
    file: "C (18).mp3",
  },
  {
    title: "19.La luna en ti 2.0",
    file: "C (19).mp3",
  },
  {
    title: "20.Sácale brillo a una pena 2.0",
    file: "C (20).mp3",
  },
  {
    title: "21.Siempre 2.0",
    file: "C (21).mp3",
  },
  {
    title: "22.El poema de la lluvia triste 2.0",
    file: "C (22).mp3",
  },
  {
    title: "23.Sigue la luz 2.0",
    file: "C (23).mp3",
  },
  {
    title: "24.¿Por qué no bailamos?",
    file: "C (24).mp3",
  },
  {
    title: "25.Desde mi cielo 2.0 (Versión orquestal)",
    file: "C (25).mp3",
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