
function whatZone(note,array) {
    //This will return what Zone the head was in when it was viewed
    //If a note has a zone then scale it 
    //I should also check if the note exists in that zone
    //otherwise it makes no sense
    //There has to be a match for a scale
    var returnZone;
    var rads = 57.296;
    var x = note.x_r;
    var y= note.y_r;
    //var x = (note.x_r * rads).toFixed(2);
    //var y = (note.y_r * rads).toFixed(2);

   // console.log(x);
    if (x < -16) {
       // console.log('--x < -16');
    }
           
           if ((x < -16) && (y > 16)){
               //    console.log('zone1');
                   returnZone = 1;
           }
           else if ((x < -18) && (y < -16)){
              //     console.log('zone2');
                   returnZone = 2;
           }
           else if ((x > 7) && (y > 16)){
              //     console.log('zone3');
                   returnZone = 3;
           }
           else if ((x > 7) && (y < -16)){
              //    console.log('zone4');
                   returnZone = 4;
           } 
           else{
              // console.log('zone0');
               returnZone = 0;
           }
    return returnZone;
}


function renderNoteSphereinScene3(note,array,qq) {
    //console.log('--renderSce3() - note ' + qq +' in notes[' + array +']' ); 
    
    var colour = getColourOfNotes(note.note); 

    var geometry = new THREE.CylinderGeometry( 7.5, 20, note.duration * 30, 32 );
    var material = new THREE.MeshBasicMaterial( {color: colour} );
    var cylinder = new THREE.Mesh( geometry, material );
 
    var distanceBetween = 25;
    var x_offset = -350   // this needs to be caluated from first note to last divided by half
 
    //cylinder.position.x = x_offset + distanceBetween + (35 * (note.time + note.duration));
    cylinder.position.x = x_offset + distanceBetween + (35 * (note.time));
   
    cylinder.position.y = convertNoteToY_Array(note.note) / 3.5;

    var z_offset = 45;
    //Modulate by Head Position
    
    if (array==0){
        
        if (note.x_cam >= 0){
          //  console.log(array + '--note.x_cam>=0 ' + z_offset + ' + ' + note.x_cam );
            cylinder.position.z = -z_offset - note.x_cam;
        } else {
            //console.log('--!note.x_cam>=0 ' + note.x_cam );
            cylinder.position.z = -z_offset;
        }
    }
    if (array==1){
        
       // cylinder.position.z = -50 - note.x_cam;
        if (note.x_cam < 0){
            //console.log(array + '--note.x_cam<0 ' + z_offset + ' + ' + note.x_cam );
            cylinder.position.z = +z_offset + (-1 * note.x_cam);
            }  else {
            //console.log(array + '--!note.x_cam<0 ' + z_offset );
            cylinder.position.z = +z_offset;
            }
    } 
     

    //First Ask what the View Zone was when it played(finished Played);
    //Then ask if the note is in that zone scale it 
    /*
   if (array==0){  
        cylinder.position.z = -z_offset; 
    }
    if (array==1){ 
         cylinder.position.z = +z_offset;
    }
    */
 //////////////////////////MODULATION//////////////////////////
 /////////////////////////////////////////////////////////////////
    //Modulate by Head Orientation
    //Rotation Around the XAxis
    //Scaling right.....
    /*
        if y rotation is positive --- Left Channel - Array 0
        if y rotation is negaitve --- Right Channel - Array 1 
        x rotation range is -30 looking up the most
                            20 looking down 
        so allow for a 25% increase in Scale 
        if note is in the range you were looking at?
        so what is the y of note and was I looking at? 

        this gets complicated quickly......
        5 regions -- Zero Region --- nothing
        -------------
         ___________
        | 1  _|_  2 |
        |___|   |___|
        |   |___|   |
        |_3____|__4_|
    */    

    /*
    var x = note.x_r;
    var y = note.y_r; 
    */
   //note.x_r = (stateOfAR.rx * 57.296).toFixed(2);
   //note.y_r = (stateOfAR.ry * 57.296).toFixed(2);

   if (array==0){  
      // console.log(array+'/'+qq+'  ('+ note.x_r+','+note.y_r+')' + ' zone'+whatZone(note));
   // cylinder.position.z = -z_offset; 
   /*   Should I scale?
        What do we know?
            The Note
            The Orientation when Viewed
            What Array it belongs too 
   */
        if ((whatZone(note) == 1 ) || (whatZone(note) == 3 ))
        {
           // console.log('zone1 or 3');
          //  note.noteThreeCylinder.scale.set( scaleDown, scaleDown, scaleDown );  
          //  note.scale = note.noteThreeCylinder.scale.x;
            
          //  console.log(cylinder.scale);

            cylinder.scale.set( 2,2,2 );
          
        }
    
    }
    if (array==1){ 
        //console.log(array+'/'+qq+'  ('+ note.x_r+','+note.y_r+')' + 'zone'+whatZone(note));
      //  console.log(array+'/'+qq)
     //   cylinder.position.z = +z_offset;
     if ((whatZone(note) == 2 ) || (whatZone(note) == 4 ))
     {
         //console.log('zone2 or 4');
       //  note.noteThreeCylinder.scale.set( scaleDown, scaleDown, scaleDown );  
       //  note.scale = note.noteThreeCylinder.scale.x;
         
        // console.log(cylinder.scale);

         cylinder.scale.set( 2,2,2 );
       
     }


    }
    //console.log(cylinder.scale);
    scene3.add( cylinder );
}


function renderScene3() {
   // camera3.position.set(-65, 65, -1);
    console.log('--renderScene3()');
    clearScene3(); 
    
   // console.log('notes01.lenght = ' + notes01.length);
   // console.log(notes01[0]);
   
    for ( var qq=0 ; qq < notes01.length ; qq++ ){    
        renderNoteSphereinScene3(notes01[qq],0 ,qq );
     } 

     for ( var ww=0 ; ww < notes02.length ; ww++ ){    
        renderNoteSphereinScene3(notes02[ww],1 ,ww );
     }  
     
    //var cubeGeometry = new THREE.CubeGeometry( 900, 900, 900 );
    var cubeGeometry = new THREE.CubeGeometry( 2200, 2200, 2200 );
    var cubeMaterial = new THREE.MeshBasicMaterial( {
        color: 0x35383A,
        side: THREE.BackSide} );
    var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
    cube.position.y = 0;
      
    //scene3.add( cube ); 

    var light = new THREE.PointLight();
    light.position.set(0, 150, 0);
    scene3.add(light);

}
