function loadAudio()    {
    console.log('--loadAudio()'); 

  
    ave_maria_2_short_L_mp3 = new Tone.Player({
        url: "midi/ave_maria_2/ave_maria_2_short_L.mp3",
        loop: false, 
        pan: -1,
    }).toDestination();

    ave_maria_2_short_R_mp3 = new Tone.Player({
        url: "midi/ave_maria_2/ave_maria_2_short_R.mp3",
        loop: false,
        pan: 1,
    }).toDestination();  
  

  chapman_fast_L = new Tone.Player({
        url: "midi/chapman_fast/chapman_fast_L.mp3",
        loop: false, 
        pan: 1,
   // })
    }).toDestination();

    chapman_fast_R = new Tone.Player({
        url: "midi/chapman_fast/chapman_fast_R.mp3",
        loop: false,
        pan: -1,
   // })
    }).toDestination(); 
  //      */

    marvin_grapevine_L = new Tone.Player({
        url: "midi/marvin_grapevine/marvin_grapevine_L.mp3",
        loop: false, 
        pan: 1,
   // })
    }).toDestination();

    marvin_grapevine_R = new Tone.Player({
        url: "midi/marvin_grapevine/marvin_grapevine_R.mp3",
        loop: false,
        pan: -1,
   // })
    }).toDestination(); 
  //      */

    amos_spirit_L = new Tone.Player({
        url: "midi/amos_spirit/amos_spirit_L.mp3",
        loop: false, 
        pan: 1,
    }).toDestination();

    amos_spirit_R = new Tone.Player({
        url: "midi/amos_spirit/amos_spirit_R.mp3",
        loop: false,
        pan: -1,
    }).toDestination(); 

    hendrix_fire_75secs_L = new Tone.Player({
        url: "midi/hendrix_fire/hendrix_fire_75secs_L.mp3",
        loop: false, 
        pan: 1,
    }).toDestination();

    hendrix_fire_75secs_R = new Tone.Player({
        url: "midi/hendrix_fire/hendrix_fire_75secs_R.mp3",
        loop: false,
        pan: -1,
    }).toDestination(); 

    ledZep_blackDog_60secs_L = new Tone.Player({
        url: "midi/ledZep_blackDog/ledZep_blackDog_60secs_R.mp3",
        //url: "midi/ave_maria_2/ave_maria_2_short_L.mp3",
        loop: false, 
        pan: 1,
    }).toDestination();

    ledZep_blackDog_60secs_R = new Tone.Player({
        url: "midi/ledZep_blackDog/ledZep_blackDog_60secs_L.mp3",
        //url: "midi/ave_maria_2/ave_maria_2_short_R.mp3",
        loop: false,
        pan: -1,
    }).toDestination(); 

    barryL = new Tone.Player({
        url: "midi/barrysIdea_01_guitarAndBassLeftChannel.mp3",
        loop: false,
        pan: 1,
    }).toDestination();

     barryR = new Tone.Player({
        url: "midi/barrysIdea_01_guitarAndBassRightChannel.mp3",
        loop: false
    }).toDestination(); 

  
}

//Consoles for Notes

function barrysIdea_01_guitarAndBass_consoleLogs()  {
    console.log(barrysIdea_01_guitarAndBass);

    console.log('--just one instrument notes');
    console.log(barrysIdea_01_guitarAndBass[0].tracks[0]);

    console.log(barrysIdea_01_guitarAndBass[0].tracks[0].notes);
    console.log(barrysIdea_01_guitarAndBass[0].tracks[0].notes[0]);
    console.log(barrysIdea_01_guitarAndBass[0].tracks[0].notes.length);
    len = barrysIdea_01_guitarAndBass[0].tracks[0].notes.length;
    console.log(barrysIdea_01_guitarAndBass[0].tracks[0].notes[0]);
    /*
            This is what is contained in each note Tone.js JSON converted MIDI File
            Header Files/Pitch bends need to be also considered
            duration: 0.6 
            durationTicks: 256 
            midi: 57 
            name: "A3" 
            ticks: 0 
            time: 0 
            velocity: 0.5039370078740157
    */
    for (i=0; i < len; i++) {
       // console.log(i);
       // console.log(barrysIdea_01_guitarAndBass[0].tracks[0].notes[i]);
    }


}
   

function hideMenu()   {
    var x = document.getElementById("userInterfaceChoice");
    x.style.display = "none"; 
}

function showMenu()   {
    var x = document.getElementById("userInterfaceChoice");
    x.style.display = "block"; 
}

function clearFlagsTimersAndCounters()   {
  //  arraysFinishedStage1.stage1_playSong = true;
    //Stage 1 & Stage 2 into Stage 3.1
    appFlags.playSongStage1 = true;
    
    //appFlags.playSong = false; 
    cAndFs2.playSong = false;

    //No Stage 1 - Stage 2 into Stage3.1
    //appFlags.playSongStage1 = false;
    //appFlags.playSong = true; 

    //Stage 3
   // appFlags.playSongStage3 = true;

    appFlags.songIsOver = false;
    appFlags.delayAtEndSecondsFlag = false;  

    parameters.placeInSong = 0; 
    clock.initialTime = 0;  
    clock.initialTimeStage1 = 0;  
    clock.delayAtEndSeconds = 0;
    console.log('--clearTimersAndCounters()');
}

//ToDo - Is this really needed?
function clearNotesAndAudioArrays()   {
    notes01 = []; 
    notes02 = [];   
  
    cAndFs1 = new clockAndFlagsForAStage("Stage1");
    cAndFs2 = new clockAndFlagsForAStage("Stage2");
    cAndFs3 = new clockAndFlagsForAStage("Stage3");

    clearScene3();
    audio.channel_L_json = [];
    audio.channel_R_json = [];
    console.log('--audioObject - noteArray and Audio cleared'); 
} 


//This function never used 
/*/
function loadArray_ave_maria_2_short_notes() {
    console.log('loadArray_ave_maria_2_short_L_notes()');
    for (o= 0; o < ave_maria_2_short_L_notes.notes.length;o++ ) {
     //   console.log(o);
         
        duration: 2.4761017031250003 
        durationTicks: 1347 
        midi: 72 
        name: "C5" 
        ticks: 3 
        time: 0.005514703125 
        velocity: 0.3937007874015748
        
     
       audio.channel_L_json[0].duration
       audio.channel_L_json[0].durationTicks
       audio.channel_L_json[0].midi
       audio.channel_L_json[0].name
       audio.channel_L_json[0].ticks
       audio.channel_L_json[0].time
       audio.channel_L_json[0].velocity

        duration
        durationTicks
        midi
        name
        ticks
        time
        velocity
 
    }
    console.log(ave_maria_2_short_R_notes.notes[0]);
//audio.channel_L_json = ave_maria_2_short_L_notes.notes
//audio.channel_R_json = ave_maria_2_short_R_notes.notes 
}
*/