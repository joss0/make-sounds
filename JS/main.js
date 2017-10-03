let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
let oscillatorNode = audioCtx.createOscillator()
let gainNode = audioCtx.createGain()
let mute = true
let frequency = 440
let direction = ""
let volume = 0.8
let speed = 1
let grossTune = 5
let mediumTune = 0.5
let fineTune = 0.05
let keys = [
  {key:81, direction:"down", tune:grossTune}, //q
  {key:87, direction:"up", tune:grossTune},   //w
  {key:69, direction:"down", tune:mediumTune},//e
  {key:82, direction:"up", tune:mediumTune},  //r
  {key:84, direction:"down", tune:fineTune},  //t
  {key:89, direction:"up", tune:fineTune},    //y
]

oscillatorNode.connect(gainNode)
gainNode.connect(audioCtx.destination)
oscillatorNode.start()
oscillatorNode.frequency.value = frequency
gainNode.gain.value = 0

;(function manualLoop() {
  setTimeout(function() {
  manualLoop()
  if (direction == "up"){
    frequency += speed
  }
  if (direction == "down"){
    frequency -= speed
  }
    oscillatorNode.frequency.value = frequency;
    document.getElementById('frequency').innerHTML = frequency.toFixed(2);
  }, 40)
}())

document.addEventListener('keydown', function(event) {
  if (event.keyCode == 32) { // space bar
    if (mute) {
      gainNode.gain.value = volume
      mute = false
    } else {
      gainNode.gain.value = 0
      mute = true
    }
  }
  for (let i = keys.length - 1; i >= 0; i--) {
    if(event.keyCode == keys[i].key) {
      direction = keys[i].direction
      speed = keys[i].tune
    }
  }
})

document.addEventListener('keyup', function(event) {
  direction = ""
});
