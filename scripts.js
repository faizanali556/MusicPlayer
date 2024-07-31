const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const progress = document.getElementById('progress');
const seekBar = document.getElementById('seek-bar');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');
const thumb = document.getElementById('thumb');
console.log(totalDurationEl)
const songs = [
  {
    name: "♫ DIL Ibaadat Kar Raha hai Dhadkanain Meri Sun ♫ T(MP3_160K)",
    title: "♫ DIL Ibaadat Kar Raha hai Dhadkanain Meri Sun ♫ T(MP3_160K)",
    artist: "Mohit",
  },
  {
    name: "Ak 47",
    title: "Ak47",
    artist: "SUNNY KAHLON FT. BHUMIKA SHARMA",
  },
  {
    name: "Arey Pagol Hoye Jabo Ami",
    title: "Arey Pagol Hoye Jabo Ami",
    artist: "Deep Jandu _ Bohemia",
  },
];
let isPlaying = false;
const playMusic = () => {
  isPlaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
};
//   for pause
const pauseMusic = () => {
  isPlaying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
};

play.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});
  

function updateProgress() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    thumb.style.left = `${progressPercent}%`;
    currentTimeEl.innerText = formatTime(currentTime);
    totalDurationEl.innerText = formatTime(duration);
   
  }
  
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  
  function setProgress(e) {
    const width = seekBar.clientWidth; //500px
    const clickX = e.offsetX;// user click on 150px
    const duration = music.duration; //300s
    music.currentTime = (clickX / width) * duration; //(150/500)*300
  }
  
 
  
  music.addEventListener('timeupdate', updateProgress);
  seekBar.addEventListener('click', setProgress);
  
//   changing music
const loadSong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = `music/${songs.name}.mp3`;
  img.src = `images/${songs.title}.jpg`;
};
let songIndex = 0;
const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

music.addEventListener('ended', nextSong);
const prevSong=()=>{
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
}

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);