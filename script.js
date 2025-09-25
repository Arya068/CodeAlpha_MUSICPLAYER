let playlist = [];
let currentTrackIndex = 0;

const audioPlayer = document.getElementById('audioPlayer');
const playlistItems = document.getElementById('playlistItems');
const volumeControl = document.getElementById('volumeControl');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const menuItems = document.getElementById('menuItems');
const miniTitle = document.getElementById('miniTitle');

// Load playlist from localStorage
function loadPlaylist() {
  const saved = localStorage.getItem('myPlaylist');
  if (saved) {
    playlist = JSON.parse(saved);
    showPlaylist();
  }
}


function savePlaylist() {
  localStorage.setItem('myPlaylist', JSON.stringify(playlist));
}

// Upload music files
function uploadFiles() {
  const files = document.getElementById('fileInput').files;
  for (let file of files) {
    const url = URL.createObjectURL(file);
    playlist.push({ title: file.name, url });
  }
  showPlaylist();
  savePlaylist();
}

// Show playlist in UI
function showPlaylist() {
  playlistItems.innerHTML = '';
  playlist.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = track.title;
    li.onclick = () => playTrack(index);
    playlistItems.appendChild(li);
  });
}

function playTrack(index = currentTrackIndex) {
  currentTrackIndex = index;
  audioPlayer.src = playlist[index].url;
  audioPlayer.play();
  miniTitle.textContent = playlist[index].title;
}

function pauseTrack() {
  audioPlayer.pause();
}

// Next track
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  playTrack(currentTrackIndex);
}

// Volume control
volumeControl.addEventListener('input', () => {
  audioPlayer.volume = volumeControl.value;
});

themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

menuToggle.addEventListener('click', () => {
  menuItems.classList.toggle('show');
});

// Swipe gestures (optional)
let startX = 0;
let endX = 0;

document.body.addEventListener('touchstart', e => {
  startX = e.changedTouches[0].screenX;
});

document.body.addEventListener('touchend', e => {
  endX = e.changedTouches[0].screenX;
  if (endX < startX - 50) nextTrack();
  if (endX > startX + 50) {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    playTrack(currentTrackIndex);
  }
});

window.onload = loadPlaylist;

// const firebaseConfig = {
//   apiKey: "AIzaSyCw1Qvz4xaaYEMndORcb9Ns8uUlTRXlhbo",
//   authDomain: "music-player-9c2dc.firebaseapp.com",
//   projectId: "music-player-9c2dc",
//   storageBucket: "music-player-9c2dc.firebasestorage.app",
//   messagingSenderId: "429078304787",
//   appId: "1:429078304787:web:45e92d247486e7dd8a07e6",
//   measurementId: "G-J7SH6LZNYS"

// };
