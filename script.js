// let playlist = [];
// let currentTrackIndex = 0;

// const audioPlayer = document.getElementById('audioPlayer');
// const playlistItems = document.getElementById('playlistItems');
// const volumeControl = document.getElementById('volumeControl');
// const searchInput = document.getElementById('searchInput');
// const themeToggle = document.getElementById('themeToggle');
// const menuToggle = document.getElementById('menuToggle');
// const menuItems = document.getElementById('menuItems');
// const genreFilter = document.getElementById('genreFilter');
// const artistFilter = document.getElementById('artistFilter');
// const miniTitle = document.getElementById('miniTitle');

// //Using localStorage
// function loadPlaylist() {
//   const stored = localStorage.getItem('myPlaylist');
//   if (stored) {
//     playlist = JSON.parse(stored);
//     renderPlaylist();
//   }
// }

// function savePlaylist() {
//   localStorage.setItem('myPlaylist', JSON.stringify(playlist));
// }


// // Uploading files
// function uploadFiles() {
//   const files = document.getElementById('fileInput').files;
//   for (let file of files) {
//     const url = URL.createObjectURL(file);
//     const title = file.name;
//     const artist = prompt(`Enter artist for "${title}"`);
//     const genre = prompt(`Enter genre for "${title}"`);
//     playlist.push({ title, url, artist, genre });
//   }
//   renderPlaylist();
//   savePlaylist();
// }



// function renderPlaylist() {
//   const genre = genreFilter.value;
//   const artist = artistFilter.value;

//   playlistItems.innerHTML = '';
//   playlist
//     .filter(track =>
//       (!genre || track.genre === genre) &&
//       (!artist || track.artist === artist)
//     )
//     .forEach((track, index) => {
//       const li = document.createElement('li');
//       li.textContent = `${track.title} (${track.artist}, ${track.genre})`;
//       li.onclick = () => playSelectedTrack(index);
//       playlistItems.appendChild(li);
//     });

//   updateFilters();
// }


// function updateFilters() {
//   const genres = [...new Set(playlist.map(track => track.genre))];
//   const artists = [...new Set(playlist.map(track => track.artist))];

//   genreFilter.innerHTML = '<option value="">All Genres</option>';
//   artistFilter.innerHTML = '<option value="">All Artists</option>';

//   genres.forEach(g => genreFilter.innerHTML += `<option value="${g}">${g}</option>`);
//   artists.forEach(a => artistFilter.innerHTML += `<option value="${a}">${a}</option>`);
// }


// //Track Selection
// function playSelectedTrack(index) {
//   currentTrackIndex = index;
//   audioPlayer.src = playlist[index].url;
//   audioPlayer.play();
//   miniTitle.textContent = playlist[index].title;
// }

// // Playback controls
// function playTrack() {
//   audioPlayer.play();
// }

// function pauseTrack() {
//   audioPlayer.pause();
// }

// function nextTrack() {
//   currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
//   playSelectedTrack(currentTrackIndex);
// }

// // Volume control
// volumeControl.addEventListener('input', () => {
//   audioPlayer.volume = volumeControl.value;
// });

// // Theme toggle
// themeToggle.addEventListener('change', () => {
//   document.body.classList.toggle('dark');
// });

// // Search filter
// searchInput.addEventListener('input', () => {
//   const query = searchInput.value.toLowerCase();
//   const filtered = playlist.filter(track =>
//     track.title.toLowerCase().includes(query) ||
//     track.artist.toLowerCase().includes(query) ||
//     track.genre.toLowerCase().includes(query)
//   );
//   playlistItems.innerHTML = '';
//   filtered.forEach((track, index) => {
//     const li = document.createElement('li');
//     li.textContent = `${track.title} (${track.artist}, ${track.genre})`;
//     li.onclick = () => playSelectedTrack(index);
//     playlistItems.appendChild(li);
//   });
// });


// menuToggle.addEventListener('click', () => {
//   menuItems.classList.toggle('show');
// });


// let touchStartX = 0;
// let touchEndX = 0;

// document.body.addEventListener('touchstart', e => {
//   touchStartX = e.changedTouches[0].screenX;
// }, false);

// document.body.addEventListener('touchend', e => {
//   touchEndX = e.changedTouches[0].screenX;
//   handleSwipeGesture();
// }, false);

// function handleSwipeGesture() {
//   const threshold = 50;
//   if (touchEndX < touchStartX - threshold) {
//     nextTrack(); // Swipe left
//   } else if (touchEndX > touchStartX + threshold) {
//     currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
//     playSelectedTrack(currentTrackIndex); // Swipe right
//   }
// }

// renderPlaylist();

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

// Save playlist to localStorage
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

// Play selected track
function playTrack(index = currentTrackIndex) {
  currentTrackIndex = index;
  audioPlayer.src = playlist[index].url;
  audioPlayer.play();
  miniTitle.textContent = playlist[index].title;
}

// Pause track
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

// Theme toggle
themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

// Hamburger menu toggle
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

// Load playlist on page load
window.onload = loadPlaylist;

const firebaseConfig = {
  apiKey: "AIzaSyCw1Qvz4xaaYEMndORcb9Ns8uUlTRXlhbo",
  authDomain: "music-player-9c2dc.firebaseapp.com",
  projectId: "music-player-9c2dc",
  storageBucket: "music-player-9c2dc.firebasestorage.app",
  messagingSenderId: "429078304787",
  appId: "1:429078304787:web:45e92d247486e7dd8a07e6",
  measurementId: "G-J7SH6LZNYS"
};