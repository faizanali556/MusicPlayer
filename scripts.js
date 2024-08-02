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
const volume_bar=document.querySelector('volume-bar')
const vol_progress=document.getElementById('vol-progress')
const vol_icon=document.getElementById('vol-icon')
const volumeSlider = document.getElementById('volume-slider')
const repeatBtn = document.getElementById('repeatBtn');
const shuffleBtn =document.getElementById('shuffle')
const downloadBtn = document.getElementById("downloadBtn");


const songs = [
  {
    name: "♫ DIL Ibaadat Kar Raha hai Dhadkanain Meri Sun ♫ T(MP3_160K)",
    title: "♫ DIL Ibaadat Kar Raha hai Dhadkanain Meri Sun ♫ T(MP3_160K)",
    artist: "Mohit",
  },
  {
    name: "Ak 47",
    title: "Ak47",
    artist: "SUNNY KAHLON ",
  },
  {
    name: "Arey Pagol Hoye Jabo Ami",
    title: "Arey Pagol Hoye Jabo Ami",
    artist: "Deep Jandu _ Bohemia",
  },
  
];
const truncateTitle = (title) => {
  return title.length > 10 ? title.substring(0, 10) + '...' : title;
};

const updatedTitle = songs.map(song => ({
  ...song,
  title: truncateTitle(song.title)

}));

console.log(updatedTitle)
// ......................................

// .......................................
let isPlaying = false;
const playMusic = () => {
  isPlaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
  img.style.animationPlayState = 'running';
};


//   for pause
const pauseMusic = () => {
  isPlaying = false;
 
  music.pause();

  play.classList.replace("fa-pause", "fa-play");
  img.style.animationPlayState = 'paused';
};

play.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});
let crrvol = 1;
function audVolume(e){
  music.volume = e.target.value;
crrvol=music.volume;
 console.log( crrvol);
}

let isVolume=false;
function icon(){
  isVolume=true;
  vol_icon.classList.replace("fa-volume-xmark","fa-volume-high")

  music.volume=crrvol;

}
function hideicon(){
  isVolume=false;
  vol_icon.classList.replace("fa-volume-high","fa-volume-xmark")
  console.log(crrvol)

  music.volume=0;

   
}

vol_icon.addEventListener("click", () => {
  isVolume ? hideicon() : icon();
});
  
let time;
function updateProgress() {
    const { duration, currentTime } = music;
  
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    thumb.style.left = `${progressPercent}%`;
    currentTimeEl.innerText = formatTime(currentTime);
    totalDurationEl.innerText = formatTime(duration);
     time= formatTime(duration*1000);
    console.log(time)
   
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
  
   volumeSlider.addEventListener('input', audVolume);
 
   ////////////////////
   let songIndex=0;
  let src;
   downloadBtn.addEventListener('click', download);
  
   function download() {
    loadSong(songs[songIndex]);
    downloadBtn.setAttribute("href", src);
    console.log(src)

}

  
  let isShuffle=false
//   changing music
function toggleShuffle() {
  if (isShuffle) {
    // Stop shuffle mode
    clearInterval(shuffleInterval);
    shuffleBtn.style.color = 'black'; // Reset color
    isShuffle = false;
    playMusic(); // Resume normal playback
  } else {
    // Start shuffle mode
    isShuffle = true;
    shuffleBtn.style.color = 'blue'; // Indicate shuffle mode
    playRandomSong();
  }
}

// Function to play a random song and set up interval for continuous shuffling
function playRandomSong() {
  

  shuffleInterval = setInterval(() => {
    songIndex = Math.floor(Math.random() * songs.length);
    loadSong(songs[songIndex]);
    playMusic();
  }, time); // Change song after the duration of the current song
}



shuffleBtn.addEventListener('click', toggleShuffle)

let duration;

const loadSong = (songs) => {
  
    title.textContent = updatedTitle[songIndex].title;
 console.log(updatedTitle[songIndex].title)
  artist.textContent = songs.artist;
  music.src = `music/${songs.name}.mp3`;
 src =  music.src
  img.src = `images/${songs.title}.jpg`;
  
 
console.log(src)
  /////////////////////////////////
  const duration= music.duration;
  

  console.log(duration)
  }

  

const nextSong = () => {

  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();

};
// Event listener for repeat button
repeatBtn.addEventListener('click', function repeatSong() {
  // Toggle repeat button state
  if (repeatBtn.classList.contains('active')) {
    repeatBtn.classList.remove('active');
    repeatBtn.style.color = ''; // Reset color
    // Remove the ended event listener
    music.removeEventListener('ended', repeatFunction);
  } else {
    repeatBtn.classList.add('active');
    repeatBtn.style.color = 'red';
    music.removeEventListener('ended', nextSong);
    music.addEventListener('ended', repeatFunction)
     
  
  }
});

// Function to repeat the song
function repeatFunction() {
  console.log(10)
  music.currentTime = 0;
  music.play
  playMusic();
}
music.addEventListener('ended', nextSong);


const prevSong=()=>{
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
}
 





next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
