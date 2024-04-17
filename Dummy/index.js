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
    { songName: "Gaytri Mantra", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Aaja Re Pardesi", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Mera Joota Hai Japani", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Aayega Aanewala", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Ae Mere Watan Ke Logon", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Chaudhvin Ka Chand Ho", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Jiya Beqarar Hai", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Man Dole Mera Tan Dole", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" }
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
        element.classList.add('fa-play-circle');
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
document.getElementById('next').addEventListener('click', () => {
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
})
document.getElementById('previous').addEventListener('click', () => {
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
})
// JavaScript for handling navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get the "About" and "Home" links
    const BSLink = document.querySelector('nav ul li:nth-child(4)');
    const aboutLink = document.querySelector('nav ul li:nth-child(3)');
    const homeLink = document.querySelector('nav ul li:nth-child(2)');
    const logo = document.querySelector('.brand img');

    // Add click event listeners to the links
    aboutLink.addEventListener('click', function() {
        // Redirect to the about.html page when "About" link is clicked
        window.location.href = 'about.html';
    });

    BSLink.addEventListener('click', function() {
        // Redirect to the about.html page when "About" link is clicked
        window.location.href = 'BS.html';
    });

    homeLink.addEventListener('click', function() {
        // Redirect to the home.html page when "Home" link is clicked
        window.location.href = 'index.html';
    });

    logo.addEventListener('click', function() {
        // Redirect to the original page when logo is clicked
        window.location.href = 'index.html';
    });
});
