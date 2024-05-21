//html buttons
const playButton = document.getElementById("play")
const pauseButton = document.getElementById("pause")
const stopButton = document.getElementById("stop")
const nextButton = document.getElementById("next")
const prevButton = document.getElementById("previous")
//html player screen
const now_playing = document.getElementById("nowPlaying")
const track_art = document.getElementById("trackArt")
const track_artist = document.getElementById("artist")
const track_title = document.getElementById("title")
//html sliders
const seek_slider = document.getElementById("seekSlider")
const volume_slider = document.getElementById("volumeSlider")
const currentTime = document.getElementById("currentTime")
const totalTime = document.getElementById("totalDuration")
//html player
const musicPlayer  = document.querySelector(".player")

//Specify globally used values
let track_index = 0
let isPlaying = false
let updateTimer
//create audio element for the player
let current_track = document.createElement('audio')

//list of track that have to be played
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

    //load a new track
    current_track.src = track_list[track_index].path
    current_track.load()

    //update details of the track
    track_art.style.backgroundImage = `url(${track_list[track_index].image})`
    track_artist.textContent = track_list[track_index].artist
    track_title.textContent = track_list[track_index].title
    now_playing.textContent = "Playing " + (track_index + 1) + " of " + track_list.length

    //set an interval of 1000 milsec for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000)

    //move to the nex track when current finishes playing
    current_track.addEventListener('ended', nextTrack)

    //apply a random bg color for player
    random_bg_color()
}

// function random_bg_color(){
//     //get a random number between 64 to 256 (for getting lighter colors)
//     let red = Math.floor(Math.random() * 256) + 64
//     let green = Math.floor(Math.random() * 256) + 64
//     let blue = Math.floor(Math.random() * 256) + 64
//
//     //construct a color with the given values and
//     //set the background to the new color
//     musicPlayer.style.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")"
// }

//get random bg color with gradient
function random_bg_color(){
    //get a random numbers between 64 to 25 for getting lighter colors
    let red1 = Math.floor(Math.random() * 256) + 64
    let green1 = Math.floor(Math.random() * 256) + 64
    let blue1 = Math.floor(Math.random() * 256) + 64
    
    let red2 = Math.floor(Math.random() * 256) + 64
    let green2 = Math.floor(Math.random() * 256) + 64
    let blue2 = Math.floor(Math.random() * 256) + 64
    
    //construct the linear gradient
    let color1 = `rgb(${red1}, ${green1}, ${blue1})`
    let color2 = `rgb(${red2}, ${green2}, ${blue2})`
    let gradient = `linear-gradient(145deg, ${color1}, ${color2}, ${color1})`;
    
    musicPlayer.style.backgroundImage = gradient
}

//function to reset all values of their default
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
    //play the loaded track
    current_track.play()
    isPlaying = true
}
function pauseTrack(){
    current_track.pause()
    isPlaying = false
}
function nextTrack(){

    //go back and play first track if current one is the last track
    if (track_index < track_list.length -1)
        track_index += 1
    else track_index = 0

    //load and play new track
    loadTrack(track_index)
    playTrack()
}
function prevTrack(){

    //go back and play last track if current one is the first track
    if (track_index > 0)
        track_index -= 1
    else track_index = track_list.length -1

    //load and play new track
    loadTrack(track_index)
    playTrack()
}

function seekTo(){

    //calculate the seek position by the percentage of the seek slider
    //and get relative duration of the track
    seekTo = current_track.duration * (seek_slider.value / 100)

    //set the current track position to the calculated seek position
    current_track.currentTime = seekTo
}

function setVolume(){

    //set the volume according to the percentage of the volume slider
    current_track.volume = volume_slider.value / 100
}

function seekUpdate(){
    let seekPosition = 0

    //check if the current track duration is a legible number
    if(!isNaN(current_track.duration)){
        seekPosition = current_track.currentTime * (100 / current_track.duration)
        seek_slider.value = seekPosition

        //calculate the time lefy and the total duration
        let currentMinutes = Math.floor(current_track.currentTime / 60)
        let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60)
        let durationMinutes = Math.floor(current_track.duration / 60)
        let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60)

        //add a zero to the single digit time values
        if (currentSeconds < 10) {currentSeconds = "0" + currentSeconds}
        if (durationSeconds < 10) {durationSeconds = "0" + durationSeconds}
        if (currentMinutes < 10) {currentMinutes = "0" + currentMinutes}
        if (durationMinutes < 10) {durationMinutes = "0" + durationMinutes}

        //display the updated duration
        currentTime.textContent = currentMinutes + ":" + currentSeconds
        totalTime.textContent = durationMinutes + ":" + durationSeconds
    }
}

//give to button life
playButton.addEventListener('click', playPauseTrack)
pauseButton.addEventListener('click', playPauseTrack)
stopButton.addEventListener('click', function(){
    pauseTrack()
    current_track.currentTime = 0
})
nextButton.addEventListener('click', nextTrack)
prevButton.addEventListener('click', prevTrack)

//give to slider life
seek_slider.addEventListener('input', seekTo)
volume_slider.addEventListener('input', setVolume)

//load the first track in the trackList
loadTrack(track_index)