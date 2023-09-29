let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
{
	name: "Chaleya",
	artist: "Arijit Singh",
	image: "https://i.scdn.co/image/ab67616d0000b27360dbbb589dff0c57a3a4ffb2",
	path: "./music/chaleya.mp3"
},
{
	name: "Maan Meri Jann",
	artist: "King",
	image: "https://i1.sndcdn.com/artworks-WqNvbC9h1xJuPpWp-DOChvg-t500x500.jpg",
	path: "./music/Maan Meri Jaan.mp3"
},
{
	name: "Ghalib Hona Hai",
	artist: "Arman Malik",
	image: "https://msonglyrics.com/wp-content/uploads/2022/12/ghalib-hona-hai-lyrics-song.jpg",
	path: "./music/Ghalib Hona Hai.mp3",
},
{
	name: "Waka Waka",
	artist: "Shakira",
	image: "https://upload.wikimedia.org/wikipedia/en/7/70/Shakirasinglewc.jpg",
	path: "./music/Waka Waka.mp3",
    },
{
	name: "Tum Se Hi",
	artist: "Mohit Chauhan",
	image: "https://upload.wikimedia.org/wikipedia/en/9/9f/Jab_We_Met_Poster.jpg",
	path: "./music/Tum Se Hi.mp3",
    },
{
	name: "Taare Ginn",
	artist: "A R Rahman",
	image: "https://i0.wp.com/lyricsted.com/wp-content/uploads/2022/05/Taare-Ginn-Lyrics.jpg",
	path: "./music/Taare Ginn.mp3",
    },
{
	name: "Oh Ho Ho Ho",
	artist: "Sukhbir",
	image: "https://i.ytimg.com/vi/m1PhXbYsBeg/maxresdefault.jpg",
	path: "./music/Oh Ho Ho Ho.mp3",
    },
{
	name: "Shiva Tandava Stotram",
	artist: "Uma Mohan Ji",
	image: "https://cdn.shopify.com/s/files/1/0592/6141/9682/files/14.03.2023_cover.jpg?v=1679062306",
	path: "./music/Shiva Tandava Stotram.mp3",
},
];
function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    updateTimer = setInterval(seekUpdate, 1000);
    
    curr_track.addEventListener("ended", nextTrack);
    
    random_bg_color();
    }
    
    function random_bg_color() {
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    document.body.style.background = bgColor;
    }
    
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }
    function playpauseTrack() {
        if (!isPlaying) playTrack();
        else pauseTrack();
        }
        
        function playTrack() {
        curr_track.play();
        isPlaying = true;
        
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
        curr_track.pause();
        isPlaying = false;
        
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        }
        
        function nextTrack() {
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
       
        loadTrack(track_index);
        playTrack();
        }
        
        function prevTrack() {
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
        
        loadTrack(track_index);
        playTrack();
        }
        function seekTo() { 
            seekto = curr_track.duration * (seek_slider.value / 100);
            curr_track.currentTime = seekto;
            }
            
            function setVolume() {
            curr_track.volume = volume_slider.value / 100;
            }
            
            function seekUpdate() {
            let seekPosition = 0;
 
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
            
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
            
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
            }
                        