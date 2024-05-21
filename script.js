const playButton = document.getElementById("play")
const pauseButton = document.getElementById("pause")
const stopButton = document.getElementById("stop")
const nextButton = document.getElementById("next")
const prevButton = document.getElementById("previous")

const track_artist = document.getElementById("artist")
const track_title = document.getElementById("title")

let track_index = 0
let isPlaying = false
let updateTimer

let current_track = document.createElement('audio')

let track_list = [
    {
        artist: "SoulProdMusic",
        title: "Movement",
        path: "movement-200697.mp3"
    },
    {
        artist: "AlexGrohl",
        title: "Mellow Future Bass (Bounce On it)",
        path: "mellow-future-bass-bounce-on-it-184234.mp3"
    }
]

function loadTrack(track_index){
    clearInterval(updateTimer)
    // resetValues();
    
    current_track.src = track_list[track_index].path
    current_track.load()
    
    updateTimer = setInterval(seekUpdate, 1000)
    
    current_track.addEventListener('ended', nextTrack)
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

playButton.addEventListener('click', playPauseTrack)
pauseButton.addEventListener('click', playPauseTrack)
stopButton.addEventListener('click', function(){
    pauseTrack()
    current_track.currentTime = 0
})
nextButton.addEventListener('click', nextTrack)
prevButton.addEventListener('click', prevTrack)

loadTrack(track_index)

function seekUpdate(){

}

