

    function convertNoteToZ_TimeStage1(timeNotePlayed) {
        var returnThis = 0.0;

        var z_initialOffset = z_forAudio.z_initialOffset;
        var timeNoteScaled = z_forAudio.timeNoteScaled;
        var timebetweenNotes = z_forAudio.timebetweenNotes; 
        var inVerseSpeed = z_forAudio.inVerseSpeed; 
        var secondsScaler = 15.75; 
        returnThis = z_initialOffset    - (timeNotePlayed * 30) - 150 
                                        + ((clock.currentTimeStage1 / inVerseSpeed) * secondsScaler) ;
        return returnThis; 
    
    }


    function placeNotesInArrayInSceneStage1 (note,noteArrayID) {   
        //ToDo - Arrays are called as 1&2 - it should be 0&1
        note.noteThreeCylinder.position.x = convertInstrumenttoX(note.instrument);
        note.noteThreeCylinder.position.y = convertNoteToY_Array(note.note);
        note.noteThreeCylinder.position.z = convertNoteToZ_TimeStage1(note.time);  
        let _time = convertMillisToMinutesAndSeconds(clock.currentTimeStage1);   
                
        if ((note.playOnceStage1 == false) && (noteArrayID == 1)) {  
            arraysFinishedStage1.notes01counter++;
            //Debug Comment
            //console.log('s1-L - ' + arraysFinishedStage1.notes01counter + ' of ' + audio.channel_L_json.length + '  ' + note.name + '  ' + note.time.toFixed(2) + ' ' + _time);
            
            if (arraysFinishedStage1.notes01counter == audio.channel_L_json.length - 3){
            //not finishing bug
                arraysFinishedStage1.notes01Flag = true
            }
        } 
                

        if ((note.playOnceStage1 == false) && (noteArrayID == 2)) {  
            arraysFinishedStage1.notes02counter++;
                //Debug Comment
            //console.log('s1R - ' + arraysFinishedStage1.notes02counter + ' of ' + audio.channel_R_json.length + '  ' + note.name + '  ' + note.time.toFixed(1) + ' ' + _time);
        
            if (arraysFinishedStage1.notes02counter == audio.channel_R_json.length - 3){
                // not finishing bug
                arraysFinishedStage1.notes02Flag = true
            }
        } 
                

        scene.add( note.noteThreeCylinder );   
        
    }
