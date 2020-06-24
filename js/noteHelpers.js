  

    //placeNotesInScene//
    function convertInstrumenttoX (instrument) {
        var x = 0;
        var instrument_00 = -100;
        var instrument_01 = 100;
        var instrument_02 = 200;

        /* Old Function
        if (noteSettings.instrument == 0){
            x = instrument_00;
        }
        if (noteSettings.instrument == 1){
            x = instrument_01;
        }
        if (noteSettings.instrument == 2){
            x = instrument_02;
        }  
        return x;
        */
        if (instrument == 0){
            x = instrument_00;
        }
        if (instrument == 1){
            x = instrument_01;
        }
        if (instrument == 2){
            x = instrument_02;
        }  
        return x; 
    } 
 

    function getColourOfNotes(note) {
    // console.log(note);
        //parse Note and Octave
        //Look for note
        // Rainbox = ROYGBIV
        // Hex Codes for those 7 and 5 flats
        // A    B C    D    E   F  G
        //   A#     C#   C#     F#   G#
        // A A# B C C# D D# E F F# G G#
        //https://www.quora.com/Why-didnt-Isaac-Newton-see-the-12-colors-of-the-rainbow-Red-Vermillion-Orange-Amber-Yellow-Chartreuse-Green-Aquamarine-Blue-Indigo-Purple-and-Magenta-are-all-present-in-a-rainbow
        /*
        Colours from a Google Search "red hex" page tab of https://www.rapidtables.com/web/color/red-color.html
        Red         FF0000
        Vermillion  E34234
        Orange      FFA500 
        Amber       FFBF00
        Yellow      FFFF00
        Chartreuse  7FFF00
        Green       00FF00
        Aquamarine  7FFFD4 
        Blue        0000FF 
        Indigo      4B0082 
        Purple      800080 
        Magenta     FF00FF
        */ 
        var colour;
    
        if (note == "A"){
            colour = 0xFF0000;
        }
        if (note == "A#"){
            //colour = 0xE34234;
            colour = 0xFF5000 ;
        }
        if (note == "B"){
            colour = 0xFFA500;
        }
        if (note == "C"){
            colour = 0xFFBF00;
        }
        if (note == "C#"){
            colour = 0xFFFF00;
        }
        if (note == "D"){
            colour = 0x7FFF00;
        }
        if (note == "D#"){
            colour = 0x00FF00;
        }
        if (note == "E"){
            colour = 0x7FFFD4;
        }
        if (note == "F"){
            colour = 0x0000FF;
        }
        if (note == "F#"){
            colour = 0x4B0082;
        }
        if (note == "G"){
            colour = 0x800080;
        }
        if (note == "G#"){
            colour = 0xFF00FF;
        }
        return colour;
        //ToDo add the rest of the colours 
    }
 

    //This one for the array
    function convertNoteToY_Array (note)  {
        //ToDo Will need to add in a Y register for Octaves
        //Octaves could be placed beside each other
        //For now just place them on the notes
        //Best to test this at another stage
        //Have a look ahead for sections 
        
        var y = 0; 
        var scaler = 15;

        var a_y     =   -5 * scaler;
        var aS_y    =   -4 * scaler;
        var b_y     =   -3 * scaler;
        var c_y     =   -2 * scaler;
        var cS_y    =   -1 * scaler;
        var d_y     =    0 * scaler;
        var dS_y    =    1 * scaler;
        var e_y     =    2 * scaler;
        var f_y     =    3 * scaler;
        var fS_y    =    4 * scaler;
        var g_y     =    5 * scaler;
        var gS_y    =    6 * scaler;
        //ToDo this should contain a section to
        //1. given a note place it at height Y
        //2. given a note colour it 
        //noteOctave
        if (note == "A"){
            y = a_y;
        }
        if (note == "A#"){
            y = aS_y;
        }
        if (note == "B"){
            y = b_y;
        }
        if (note == "C"){
            y = c_y;
        }
        if (note == "C#"){
            y = cS_y;
        }
        if (note == "D"){
            y = d_y;
        }
        if (note == "D#"){
            y = dS_y;
        }
        if (note == "E"){
            y = e_y;
        }
        if (note == "F"){
            y = f_y;
        }
        if (note == "F#"){
            y = fS_y;
        }
        if (note == "G"){
            y = g_y;
        }
        if (note == "G#"){
            y = gS_y;
        }
        return y;         
    }


    //this one for the individual notes
    function convertNoteToY (noteSettings)  { 
        var y = 0;
        var scaler = 25;
        var a_y = -2 * scaler;
        var b_y = -1 * scaler;
        var c_y = 0;
        var d_y = 1 * scaler;
        var e_y = 2 * scaler;
        var f_y = 3 * scaler;
        var g_y = 4 * scaler;
        //ToDo this should contain a section to
        //1. given a note place it at height Y
        //2. given a note colour it 
        //noteOctave
        if (noteSettings.noteOctave == "A4"){
            y = a_y;
        }
        if (noteSettings.noteOctave == "C4"){
            y = c_y;
        }
        if (noteSettings.noteOctave == "F4"){
            y = f_y;
        }
        return y; 
    }


    function convertNoteToZ_Time(timeNotePlayed,currentTime) {
        var returnThis = 0.0;
        //  console.log(clock_S2.currentTime);
        var z_initialOffset = z_forAudio.z_initialOffset;
        var timeNoteScaled = z_forAudio.timeNoteScaled;
        var timebetweenNotes = z_forAudio.timebetweenNotes; 
        var inVerseSpeed = z_forAudio.inVerseSpeed; 
        var secondsScaler = 22.75;
        returnThis = z_initialOffset    - (timeNotePlayed * timeNoteScaled) - timebetweenNotes 
                                        //+ (clock_S2.currentTime / inVerseSpeed) ; 
                                        + (currentTime / inVerseSpeed) ; 
        return returnThis; 
    }


    function convertMillisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        // var seconds = ((millis % 60000) / 1000).toFixed(3);
        var seconds = ((millis) / 1000).toFixed(2);
        //return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        return seconds;
    } 


function UnusedFunctions() {
/* ToDo - Unused Function
    function convertNoteToZ_NoTime(timeNotePlayed) {
        var returnThis = 0.0;

        //var z_initialOffset = z_forAudio.z_initialOffset;
        var z_initialOffset = -250;
        var timeNoteScaled = z_forAudio.timeNoteScaled;
        //var timebetweenNotes = z_forAudio.timebetweenNotes; 
        var timebetweenNotes = 25; 
        var inVerseSpeed = z_forAudio.inVerseSpeed; 

        returnThis = z_initialOffset    - (timeNotePlayed * timeNoteScaled) - timebetweenNotes;
        // returnThis = z_initialOffset    - (timeNotePlayed + timebetweenNotes) 
                                    // + (clock.currentTime / inVerseSpeed) ;
                                    // + ((clock.currentTime / inVerseSpeed) * secondsScaler) ;
        return returnThis;  
    }
*/



/* ToDo - Unused Function
    function determineLengthOfLongest()  {
    // console.log(parameters.lengthOfLongest);
        //console.log(parameters.lengthOfLongest.length);
        var lengthOfLongest = 0; 
        var whichNotesArray = 0
        if (audio.channel_L_json.length >= audio.channel_R_json.length) {
            lengthOfLongest = audio.channel_L_json.length;
            //console.log("audio.channel_L_json.length longest - " + audio.channel_L_json.length);
            parameters.lengthOfLongest.length = audio.channel_L_json.length;
            parameters.lengthOfLongest.notearray = 1;
        } 
        else {
            lengthOfLongest = audio.channel_R_json.length;
            //console.log("audio.channel_R_json.length longest - " + audio.channel_R_json.length);
            parameters.lengthOfLongest.length = audio.channel_R_json.length;
            parameters.lengthOfLongest.notearray = 1;
        }
        appFlags.determineLengthOfLongestFlag = true;
        console.log('parameters.lengthOfLongest.length =' + parameters.lengthOfLongest.length);
        console.log('parameters.lengthOfLongest.notearray =' + parameters.lengthOfLongest.notearray);
    // console.log(parameters.lengthOfLongest.length); 
    }


//////////////Remove when Tidy
    function determineLengthOfBoth()  { 
        let lengthOfBoth = audio.channel_L_json.length + audio.channel_R_json.length; 
        console.log('--lenght of both() = ' + lengthOfBoth );
        return lengthOfBoth;
    }

function makeThemMove_placeNotesInArrayInScene() {
    for ( var p=0 ; p < notes01.length ; p++ ){ 
        // if (appFlags.songIsOver == false) { 
             placeNotesInArrayInScene(notes01[p],1);
             if (p < notes02.length){
                     placeNotesInArrayInScene(notes02[p],2);
                 }
      //   }
     }
}
*/ 
}