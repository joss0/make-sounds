let interval = Math.pow(2, 1/12)

let noteNames = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']

let findNoteName = (note)=> {
  return noteNames[loopArr(noteNames.length, note)]
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

let freqFactory = f=> n=> f*(Math.pow(Math.pow(2, 1/12), n))
