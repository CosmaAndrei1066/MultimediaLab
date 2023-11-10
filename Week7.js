//need the .mp3 files from online.ase.ro
window.onload = function() {

    let pianoSounds = new Array(128).fill(null); 
    let oscillatorSounds = new Array(128).fill(null);

    var emulatedKeys = {
        q: 60, 2: 61, w: 62, 3: 63, e: 64,
        r: 65, 5: 66, t: 67, 6: 68, y: 69,
        7: 70, u: 71, i: 72
    } 
    
    let usePiano = true;

    function initialize(){
        for(let i=36;i<=96;i++){
            let noteName = document.querySelector(`[data-midi-code="${i}"]`).getAttribute('data-note');
            //console.log(noteName);
            pianoSounds[i]=new Audio(`../notes/${noteName}.mp3`);
            oscillatorSounds[i]= createOscillator(i);
        }
    }
    
    initialize();

    function createOscillator(midiCode){
        let context = new AudioContext();

        let oscillator = context.createOscillator();
        oscillator.type='sine';
        let frequency = 440 * Math.pow(2,(midiCode-69)/12);
        oscillator.frequency.setValueAtTime(frequency, context.currentTime);
        oscillator.connect(context.destination);
        oscillator.start();

        return {
            context: context,
            oscillator: oscillator
        }
    }

    function playPianoNote(midiCode){
        pianoSounds[midiCode].play();
    }

    function playOscillator(midiCode){
        oscillatorSounds[midiCode].context.resume();
    }
    
    function stopPianoNote(midiCode){
        pianoSounds[midiCode].pause();
        pianoSounds[midiCode].currentTime=0;
    }

    function stopOscillator(midiCode){
        oscillatorSounds[midiCode].context.suspend();
    }

    function keyDown(midiCode){
        if(usePiano==true){
            playPianoNote(midiCode);
        }
        else{
            playOscillator(midiCode);
        }
    }

    function keyUp(midiCode){
        if(usePiano==true){
            stopPianoNote(midiCode);
        }
        else{
            stopOscillator(midiCode);
        }
    }

    window.addEventListener('keydown', function(e){
        console.log(e);
        let key = e.key;
        if(emulatedKeys.hasOwnProperty(key)){
            keyDown(midiCode);
        }
    });
    window.addEventListener('keyup', function(e){
        console.log(e);
        let key = e.key;
        if(emulatedKeys.hasOwnProperty(key)){
            keyUp(midiCode);
        }
    });

    
}
