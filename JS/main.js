let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
let oscillatorNode = audioCtx.createOscillator()
let gainNode = audioCtx.createGain()

// initialise vals
let mute = false
let note = 57 // MIDI note A4
let volume = 0.5

let controllerArr = [
  {keyCode: 65, interval: {value: -12, name:'octave'}},
  {keyCode: 83, interval: {value: 12, name:'octave'}},
  {keyCode: 90, interval: {value: -2, name:'tone'}},
  {keyCode: 88, interval: {value: 2, name:'tone'}},
  {keyCode: 68, interval: {value: -1, name:'semitone'}},
  {keyCode: 70, interval: {value: 1, name:'semitone'}},
  {keyCode: 71, interval: {value: -0.25, name:'quartertone'}},
  {keyCode: 72, interval: {value: 0.25, name:'quartertone'}},
]

let keydownEventHandler = keyboardEvent=> {
  let keyCode = keyboardEvent.keyCode
  if (keyCode !== 32) {
    for (var i=0; i < controllerArr.length; i++) {
      if (keyCode === controllerArr[i].keyCode){
        retuneOsc(controllerArr[i].interval.value)
      }
    }
  } else toggleMute()
}

let toggleMute = ()=> {
  if (mute) {
    mute = false
    gainNode.gain.value = volume
  } else {
    mute = true
    gainNode.gain.value = 0
  }
}

let setOscTuning = n=> {
  noteNum.innerHTML = note = n

  noteName.innerHTML = findNoteName(note)

  frequency.innerHTML = oscillatorNode.frequency.value = freq(n)
}

let retuneOsc = n=> {
  noteNum.innerHTML = note += n

  noteName.innerHTML = findNoteName(note)

  frequency.innerHTML = oscillatorNode.frequency.value = freq(note - 57)
}

let load = ()=> {
  oscillatorNode.connect(gainNode)
  gainNode.connect(audioCtx.destination)
  oscillatorNode.frequency.value = 440
  gainNode.gain.value = volume
  oscillatorNode.start()
  noteNum.innerHTML = 57
  frequency.innerHTML = 440
  noteName.innerHTML = "A"
}

document.onload = load()
document.addEventListener('keydown', keydownEventHandler)
