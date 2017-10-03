let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
let oscillatorNode = audioCtx.createOscillator()
let gainNode = audioCtx.createGain()

// initial vals
let mute = true
let frequency = 440
let note = 57 // MIDI note A4
let direction = ""
let volume = 0.8

// detune rate
let speed = 1
let grossTune = 5
let mediumTune = 0.5
let fineTune = 0.05

// key bindings
let keys = [
  {key:81, direction:"down", tune:grossTune}, //q
  {key:87, direction:"up", tune:grossTune},   //w
  {key:69, direction:"down", tune:mediumTune},//e
  {key:82, direction:"up", tune:mediumTune},  //r
  {key:84, direction:"down", tune:fineTune},  //t
  {key:89, direction:"up", tune:fineTune},    //y
]

let noteKeys = [
  {key:65, direction:'down', tune:octave}, //a
  {key:83, direction:'up', tune:octave}, //s
  {key:68, direction:'down', tune:note}, //d
  {key:70, direction:'up', tune:note}, //f
]

oscillatorNode.connect(gainNode)
gainNode.connect(audioCtx.destination)
oscillatorNode.start()
oscillatorNode.frequency.value = frequency
gainNode.gain.value = 0

const A4 = 440
const interval = Math.pow(2, 1/12)
let firstNote = A4

let freqOfNote = note=> firstNote*(Math.pow(interval, note))

let midi = ()=> {
  let notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
  let a = []
  for (let midiNote=0; midiNote<128; midiNote++) {
    a.push({
      midiNoteName: notes[loopArr(notes.length, midiNote)] + '' + Math.floor(midiNote/12),
      noteName: notes[loopArr(notes.length, midiNote)],
      noteFrequency: freqOfNote(midiNote-57),

    })
  }
  return a
}

let loopArr = (len, pos)=> {
  if(pos >= 0 && pos < len) {
    return pos
  } else if(pos < 0) {
    while(pos < 0) {
      pos+=len
    }
    return pos
  } else {
    return pos%len
  }
}

;(function manualLoop() {
  setTimeout(function() {
  manualLoop()
  if (direction == "up"){
    frequency += speed
  }
  if (direction == "down"){
    frequency -= speed
  }
    oscillatorNode.frequency.value = frequency
    document.getElementById('frequency').innerHTML = frequency.toFixed(2)
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
  for (let i=0; i < keys.length; i++) {
    if(event.keyCode == keys[i].key) {
      direction = keys[i].direction
      speed = keys[i].tune
    }
  }
})

document.addEventListener('keyup', function(event) {
  direction = ""
})
