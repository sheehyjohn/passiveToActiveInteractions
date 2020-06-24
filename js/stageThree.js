

function placeNotesInArrayInSceneStage3 (note,noteArrayID) {   
/*
    note.noteThreeCylinder.position.x = convertInstrumenttoX(note.instrument);
    note.noteThreeCylinder.position.y = convertNoteToY_Array(note.note);
    note.noteThreeCylinder.position.z = convertNoteToZ_Time(note.time);
    scene3.add( note.noteThreeCylinder );   
 
    let _time = convertMillisToMinutesAndSeconds(clock.currentTime); 
        
    //if (audio.channel_L_mp3.state == "stopped")   { audio.channel_L_mp3.start();  } 
    //if (audio.channel_R_mp3.state == "stopped")   { audio.channel_R_mp3.start();  }  

    if (( note.time < _time ) && (_time < (note.time + note.duration)) ) {  
            
            if ((note.playOnceStage3 == false) && (noteArrayID == 1)) {  
                note.playOnceStage3 = true;  
                arraysFinished.notes01counter++;
                //Debug Comment
              
                console.log('L - ' + arraysFinished.notes01counter + ' of ' + audio.channel_L_json.length + '  ' + note.name + '  ' + note.time.toFixed(2) + ' ' + _time);
                //if (arraysFinished.notes01counter == audio.channel_L_json.length){
                if (arraysFinished.notes01counter == audio.channel_L_json.length - 3){
                //not finishing bug
                    arraysFinished.notes01Flag = true
                }
            } 
              

            if ((note.playOnceStage3 == false) && (noteArrayID == 2)) {  
                note.playOnceStage3 = true; 
                arraysFinished.notes02counter++;
                document.getElementById('noteRight').innerHTML = note.name;
                 //Debug Comment
                console.log('R - ' + arraysFinished.notes02counter + ' of ' + audio.channel_R_json.length + '  ' + note.name + '  ' + note.time.toFixed(2) + ' ' + _time);
                //if (arraysFinished.notes02counter == audio.channel_R_json.length){
                // not finishing bug
                if (arraysFinished.notes02counter == audio.channel_R_json.length - 3){
                    arraysFinished.notes02Flag = true
                }
            } 

            if (arraysFinished.bothFinished() == true) {
               console.log('---bothFinished');
                appFlags.songIsOver = true;
            } 

            //Rotate 
            note.noteThreeCylinder.rotation.z = note.noteThreeCylinder.rotation.z + 16
            note.rotation = note.noteThreeCylinder.rotation.z / 180;
            
            //Shrink by scaling down - however it goes again
            let scaleDown =  note.noteThreeCylinder.scale.x;
            let scaleDownRate = 0.0375;
            scaleDown = scaleDown - (scaleDownRate / note.duration); 
            note.noteThreeCylinder.scale.set( scaleDown, scaleDown, scaleDown );  
            note.scale = note.noteThreeCylinder.scale.x; 
        } 
   */ 
}



function renderNoteSphereinScene3andaThird(note, noteArrayID ,qq, cAndF) { 
    var colour = getColourOfNotes(note.note); 
    let _time = convertMillisToMinutesAndSeconds(clock.currentTimeStage3); 
 
    var geometryCly = new THREE.CylinderGeometry( 20, 1, note.duration * 150, 8 );
    var material = new THREE.MeshBasicMaterial( {color: colour} );
    var cylinder = new THREE.Mesh( geometryCly, material );

    const edges = new THREE.EdgesGeometry(geometryCly);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const edgesMesh = new THREE.LineSegments(edges, edgesMaterial);  
 
    //ToDo - need to match renderNotesSpheresinScene3();
    var distanceBetween = 25;
    var x_offset = -350   // this needs to be caluated from first note to last divided by half 
    var z_offset = 175;
    //cylinder.position.x = x_offset + distanceBetween + (35 * (note.time + note.duration)); 
    cylinder.position.x = x_offset + distanceBetween + (35 * (note.time)); 
    cylinder.position.y = convertNoteToY_Array(note.note) / 3.5;
 
    //ToDo this check is better performed before calling this render
    if (( note.time < _time ) && (_time < (note.time + note.duration)) ) {  
        
        var finishingOffset = 0;

        if ((note.playOnceStage3 == false) && (noteArrayID == 0)) {
           // document.getElementById('noteLeft').innerHTML = note.name;
            
           
            note.playOnceStage3 = true;  
            cAndF.notes01counter++;
            console.log('--pO3L ' + cAndF.notes01counter + ' of ' + audio.channel_L_json.length + ' ' +  _time  + ' , ' + note.time.toFixed(1) ); 
            if (cAndF.notes01counter == audio.channel_L_json.length - finishingOffset){    //not finishing bug 
                cAndF.notes01Flag = true ;
            } 
            //console.log( cAndF.notes01Flag + ' ' + cAndF.notes02Flag)
            cylinder.position.z = -z_offset; 
            scene3.add( cylinder ); 
            edgesMesh.position.set(cylinder.position.x, cylinder.position.y , cylinder.position.z);
            scene3.add(edgesMesh) 
        }
         
        if ((note.playOnceStage3 == false) && (noteArrayID == 1)) {
           // document.getElementById('noteRight').innerHTML = note.name;            
           
             
            note.playOnceStage3 = true;  
            cAndF.notes02counter++;
            console.log('--pO3R ' + cAndF.notes02counter + ' of ' + audio.channel_R_json.length + ' ' +  _time  + ' , ' + note.time.toFixed(1) ); 
            if (cAndF.notes02counter == audio.channel_R_json.length - finishingOffset){    //not finishing bug 
                cAndF.notes02Flag = true ;
            } 

            cylinder.position.z = +z_offset 
            scene3.add( cylinder );
            edgesMesh.position.set(cylinder.position.x, cylinder.position.y , cylinder.position.z);
            scene3.add(edgesMesh); 
        } 

        if (cAndF.bothFinished() == true) { 
            console.log('---Stage3 Over ');
            cAndF.playSongFlag = false;
            cAndFs3.songIsOverFlag = true;
        } 

    }   
   
}