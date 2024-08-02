document.getElementById("play-music-button-icon").className = "bi bi-play-fill";
const circleType = new CircleType(document.getElementById('rotating-text'));

function playMusic() {
    var music = document.getElementById("music");
    var button = document.getElementById("play-music-button-icon");
    if (music.paused) {
        button.className = "bi bi-pause-fill"
        music.play();
    } else {
        button.className = "bi bi-play-fill"
        music.pause();  
    }
}
