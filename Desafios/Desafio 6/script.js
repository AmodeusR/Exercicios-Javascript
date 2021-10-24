const audioContext = new AudioContext();
const test = audioContext.createOscillator();
test.connect(audioContext.destination);

const NOTE_DETAILS = [
  { note: "C", key: "Z", frequency: 261.626 },
  { note: "Db", key: "S", frequency: 277.183 },
  { note: "D", key: "X", frequency: 293.665 },
  { note: "Eb", key: "D", frequency: 311.127 },
  { note: "E", key: "C", frequency: 329.628 },
  { note: "F", key: "V", frequency: 349.228 },
  { note: "Gb", key: "G", frequency: 369.994 },
  { note: "G", key: "B", frequency: 391.995 },
  { note: "Ab", key: "H", frequency: 415.305 },
  { note: "A", key: "N", frequency: 440 },
  { note: "Bb", key: "J", frequency: 466.164 },
  { note: "B", key: "M", frequency: 493.883 }
];

const piano = document.querySelector(".piano");

// Piano sound

const playSound = (noteDetails, gain) => {
  const frequency = noteDetails.frequency;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  gainNode.gain.value = gain;

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start(0);

  noteDetails.oscillator = gainNode;

}

// Mouse Response (note finished)

piano.addEventListener("mousedown", handleKeyClick);
piano.addEventListener("mouseup", handleKeyClick);

function handleKeyClick (e) {
  const notePlayed = e.target.dataset.note;
  const keyPlayed = e.target;

  // const pressPianoKey = NOTE_DETAILS.find(mouseClick => mouseClick.note === notePlayed);
  // // const oscillator = playSound(pressPianoKey.frequency, e);
  // console.log(e.type)
  // if (e.type === "keyup") {
  //   console.log(oscillator)
  // }
  keyPlayed.classList.toggle("active");
}

// Keyboard Response

document.addEventListener("keydown", handleKeyPlay);
document.addEventListener("keyup", handleKeyPlay);

function handleKeyPlay (e) {
  if (e.repeat) return;
  
  inputKey = e.key.toUpperCase();
  const playNote = NOTE_DETAILS.find(keyboard => keyboard.key === inputKey);
  
  // Check if the note isn't a falsy value. If it isn't, the corresponding note will be played
  if (playNote?.note) {
    const pianoKeys = Array.from(piano.children);
    const pressPianoKey = pianoKeys.find(key => key.dataset.note === playNote.note);
    
    pressPianoKey.classList.toggle("active");
    const pressedKeys = pianoKeys.reduce((acc, item) => item.classList.contains("active") ? ++acc : acc, 0);
      // In some cases, it seems the number would end up with the "infinity" value. I didn't quite get the reason of the error, but I considered it had something to do with float number
    const reduceGain = Number((.5 / pressedKeys).toFixed(3)); 

      if (e.type === "keydown") {
        playSound(playNote, reduceGain);
      } else {
        const oscillators = NOTE_DETAILS.filter(note => note.oscillator != null);
        oscillators.forEach(({ oscillator }) => {
          // Reduces volume quickly so we can avoid clickings
          oscillator.gain.setTargetAtTime(0, audioContext.currentTime, 0.015);
        });
      }
  }
}
