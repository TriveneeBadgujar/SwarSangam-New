console.log("Welcome to SwarSangam");
//Initialize variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "Lata Mangeshkar ", filePath: "songs/1.mp3", coverPath: "BS/Lata.jpg" },
    { songName: "Mohammed Rafi - Kishore Kumar ", filePath: "songs/2.mp3", coverPath: "BS/Raffi.jpg" },
    { songName: "Udit Narayan ", filePath: "songs/3.mp3", coverPath: "BS/kishor.jpg" },
    { songName: "Asha Bhosle ", filePath: "songs/4.mp3", coverPath: "BS/Asha.jpg" },
    { songName: "Sonu Nigam ", filePath: "songs/5.mp3", coverPath: "BS/Mukesh.jpg" },
    { songName: "S. P. Balasubrahmanyam  ", filePath: "songs/6.mp3", coverPath: "BS/SP.jpg" },
    { songName: "Alka Yagnik ", filePath: "songs/7.mp3", coverPath: "BS/Geeta.jpg" },
    { songName: "Kumar Sanu ", filePath: "songs/8.mp3", coverPath: "BS/Hemant.jpg" },
    { songName: "Manna Dey ", filePath: "songs/9.mp3", coverPath: "BS/Dey.jpg" },
    { songName: "Old Classical Music Mashup", filePath: "songs/10.mp3", coverPath: "BS/Talat.jpg" }
];

songItems.forEach((Element, i) => {
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    Element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//Handle play pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
//Listen Event

audioElement.addEventListener('timeupdate', () => {
    //Seekbar update
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.remove('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        // audioElement.addEventListener('timeupdate', updateTimestamp);

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            console.log(`Attempting to play: songs/${songIndex}.mp3`);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else {
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    })
})

// function updateSongUI() {
//     // Reset all play buttons to play state
//     makeAllPlays();
    
//     // Update the play button of the current song to pause state
//     const playButton = document.getElementById(`${songIndex}`);
//     playButton.classList.remove('fa-play-circle');
//     playButton.classList.add('fa-pause-circle');
// }
document.getElementById('next').addEventListener('click', () => {
    audioElement.removeEventListener('timeupdate', updateTimestamp);
    if (songIndex >= 8) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateSongUI();
    const nextPlayButton = document.getElementById(`${songIndex - 1}`);
    updatePlayButton(nextPlayButton, false); // Assuming the song starts playing automatically
})

document.getElementById('previous').addEventListener('click', () => {
    audioElement.removeEventListener('timeupdate', updateTimestamp);
    if (songIndex < 0) {
        songIndex = 8;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateSongUI();
    const previousPlayButton = document.getElementById(`${songIndex + 1}`);
    updatePlayButton(previousPlayButton, false); // Assuming the song starts playing automatically
})

function updateSongUI() {
    // Reset all play buttons to play state
    makeAllPlays();
    
    // Update the play button of the current song to pause state
    const playButton = document.getElementById(`${songIndex}`);
    playButton.classList.remove('fa-play-circle');
    playButton.classList.add('fa-pause-circle');
}

function updatePlayButton(playButton, isPlaying) {
    if (isPlaying) {
        playButton.classList.remove('fa-play-circle');
        playButton.classList.add('fa-pause-circle');
    } else {
        playButton.classList.remove('fa-pause-circle');
        playButton.classList.add('fa-play-circle');
    }
}

// JavaScript for handling navigation
document.addEventListener('DOMContentLoaded', function () {
    // Get the "About" and "Home" links
    const BSLink = document.querySelector('nav ul li:nth-child(4)');
    const aboutLink = document.querySelector('nav ul li:nth-child(3)');
    const homeLink = document.querySelector('nav ul li:nth-child(2)');
    const logo = document.querySelector('.brand img');

    // Add click event listeners to the links
    aboutLink.addEventListener('click', function () {
        // Redirect to the about.html page when "About" link is clicked
        window.location.href = 'about.html';
    });

    BSLink.addEventListener('click', function () {
        // Redirect to the about.html page when "About" link is clicked
        window.location.href = 'BS.html';
    });

    homeLink.addEventListener('click', function () {
        // Redirect to the home.html page when "Home" link is clicked
        window.location.href = 'index.html';
    });

    logo.addEventListener('click', function () {
        // Redirect to the original page when logo is clicked
        window.location.href = 'index.html';
    });
});




document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const pageTitle = document.getElementById('pageTitle');
    const songListContainer = document.querySelector('.songList');

    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredSongs = songs.filter(song => song.songName.toLowerCase().includes(searchTerm));
        renderFilteredSongs(filteredSongs);
        // Update page title visibility
        pageTitle.style.display = 'block';
        // Play the first song in the filtered list
        if (filteredSongs.length > 0) {
            playSong(filteredSongs[0].filePath);
        }
    });
});

function renderFilteredSongs(filteredSongs) {
    const songListContainer = document.querySelector('.songList');
    songListContainer.innerHTML = ''; // Clear previous content

    if (filteredSongs.length === 0) {
        songListContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    filteredSongs.forEach(song => {
        const songItem = document.createElement('div');
        songItem.classList.add('songItem');
        songItem.innerHTML = `
            <img src="${song.coverPath}" alt="${song.songName}">
            <span class="songName">${song.songName}</span>
            <span class="songlistPlay"><span class="timestamp"><i class="far songItemPlay fa-play-circle"></i></span></span>
        `;
        songListContainer.appendChild(songItem);
    });

    // Add event listeners to play buttons for filtered songs
    const playButtons = document.querySelectorAll('.songItemPlay');
    playButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            playSong(filteredSongs[index].filePath);
        });
    });
}

// let audioElement; // Define audio element globally

function playSong(filePath) {
    // Stop any currently playing song
    if (audioElement) {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
    // Play the selected song
    audioElement = new Audio(filePath);
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // Find the song based on its file path
    const currentSong = songs.find(song => song.filePath === filePath);
    if (currentSong) {
        // Update the masterSongName with the accurate song name
        masterSongName.innerText = currentSong.songName;
    } else {
        masterSongName.innerText = "Unknown Song"; // In case song is not found
    }

    // Update timestamp
    audioElement.addEventListener('timeupdate', updateTimestamp);
}

function updateTimestamp() {
    const currentTime = formatTime(audioElement.currentTime);
    const duration = formatTime(audioElement.duration);
    const timestampElement = document.querySelector('.timestamp');
    timestampElement.textContent = `${currentTime}/${duration}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}