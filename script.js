const playButton = document.getElementById("play")
const pauseButton = document.getElementById("pause")
const stopButton = document.getElementById("stop")
const nextButton = document.getElementById("next")
const prevButton = document.getElementById("previous")

const now_playing = document.getElementById("nowPlaying")
const track_art = document.getElementById("trackArt")
const track_artist = document.getElementById("artist")
const track_title = document.getElementById("title")

const seek_slider = document.getElementById("seekSlider")
const volume_slider = document.getElementById("volumeSlider")
const currentTime = document.getElementById("currentTime")
const totalTime = document.getElementById("totalDuration")

let track_index = 0
let isPlaying = false
let updateTimer

let current_track = document.createElement('audio')

let track_list = [
    {
        artist: "SoulProdMusic",
        title: "Movement",
        image: "SoulProdMusic.jpg",
        path: "movement-200697.mp3"
    },
    {
        artist: "AlexGrohl",
        title: "Mellow Future Bass (Bounce On it)",
        image: "AlexGrohl.jpg",
        path: "mellow-future-bass-bounce-on-it-184234.mp3"
    },
    {
        artist: "RoyaltyFreeMusic",
        title: "Trap Future Bass",
        image: "18-11-08-234_200x200.jpg",
        path: "trap-future-bass-royalty-free-music-167020.mp3"
    }
]

function loadTrack(track_index){
    clearInterval(updateTimer)
    resetValues();
    
    current_track.src = track_list[track_index].path
    current_track.load()
    
    track_art.style.backgroundImage = `url(${track_list[track_index].image})`
    track_artist.textContent = track_list[track_index].artist
    track_title.textContent = track_list[track_index].title
    now_playing.textContent = "Playing" + (track_index + 1) + "of" + track_list.length
    
    updateTimer = setInterval(seekUpdate, 1000)
    
    current_track.addEventListener('ended', nextTrack)
}

function resetValues(){
    currentTime.textContent = "00:00"
    totalTime.textContent = "00:00"
    seek_slider.value = 0
}

function playPauseTrack(){
    if(!isPlaying) playTrack()
    else pauseTrack()
}
function playTrack(){
    current_track.play()
    isPlaying = true
}
function pauseTrack(){
    current_track.pause()
    isPlaying = false
}
function nextTrack(){
    if (track_index < track_list.length -1)
        track_index += 1
    else track_index = 0
    loadTrack(track_index)
    playTrack()
}
function prevTrack(){
    if (track_index > 0)
        track_index -= 1
    else track_index = track_list.length -1
    
    loadTrack(track_index)
    playTrack()
}

function seekTo(){
    seekTo = current_track.duration * (seek_slider.value / 100)
    current_track.currentTime = seekTo
}
function setVolume(){
    current_track.volume = volume_slider.value / 100
}
function seekUpdate(){
    let seekPosition = 0
    
    if(!isNaN(current_track.duration)){
        seekPosition = current_track.currentTime * (100 / current_track.duration)
        seek_slider.value = seekPosition
        let currentMinutes = Math.floor(current_track.currentTime / 60)
        let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60)
        let durationMinutes = Math.floor(current_track.duration / 60)
        let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60)
        
        if (currentSeconds < 10) {currentSeconds = "0" + currentSeconds}
        if (durationSeconds < 10) {durationSeconds = "0" + durationSeconds}
        if (currentMinutes < 10) {currentMinutes = "0" + currentMinutes}
        if (durationMinutes < 10) {durationMinutes = "0" + durationMinutes}
        
        currentTime.textContent = currentMinutes + ":" + currentSeconds
        totalTime.textContent = durationMinutes + ":" + durationSeconds
    }
}


playButton.addEventListener('click', playPauseTrack)
pauseButton.addEventListener('click', playPauseTrack)
stopButton.addEventListener('click', function(){
    pauseTrack()
    current_track.currentTime = 0
})
nextButton.addEventListener('click', nextTrack)
prevButton.addEventListener('click', prevTrack)

seek_slider.addEventListener('input', seekTo)
volume_slider.addEventListener('input', setVolume)

loadTrack(track_index)