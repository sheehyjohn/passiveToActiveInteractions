// /if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
			 
// 3d model setup
var container, container3;
var stats;
var camera1, camera2, camera3;
var scene, scene3; 
var renderer, renderer2, renderer3;
var plane;
var controls, controls2, controls3;
 
  

function walls()    { 
    
    //top wall
   let plane1 = new THREE.Mesh( new THREE.PlaneGeometry( 500, 3000, 5, 15 ), new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe : true } ) );
    plane1.rotation.x = Math.PI/2;
    plane1.position.y = 250;
    plane1.position.z = 50-1500;
    scene.add( plane1 );
    
    //left wall
    plane2 = new THREE.Mesh( new THREE.PlaneGeometry( 3000, 500, 15, 5 ), new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe : true } ) );
    plane2.rotation.y = Math.PI/2;
    plane2.position.x = -250;
    plane2.position.z = 50-1500;
    scene.add( plane2 );
    
    //right wall
    plane3 = new THREE.Mesh( new THREE.PlaneGeometry( 3000, 500, 15, 5 ), new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe : true	} ) );
    plane3.rotation.y = -Math.PI/2;
    plane3.position.x = 250;
    plane3.position.z = 50-1500;
    scene.add( plane3 );
    
    //bottom wall
    plane4 = new THREE.Mesh( new THREE.PlaneGeometry( 500, 3000, 5, 15 ), new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe : true	} ) );
    plane4.rotation.x = -Math.PI/2;
    plane4.position.y = -250;
    plane4.position.z = 50-1500;
    scene.add( plane4 );
}

/////////////Clear Scenes
    function clearScene()   {
        while(scene.children.length > 0){ 
            scene.remove(scene.children[0]); 
        }
    }

    function clearScene3()   { 
        if (scene3.children.length > 0 ){  
            while(scene3.children.length > 0){ 
                scene3.remove(scene3.children[0]); 
            }
        } 
    }

function init() {  
    container = document.getElementById( 'scene1_3dCanvas' ); 
    container3 = document.getElementById( 'scene3_3dCanvas' ); 

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, 1, 3000 );
    scene3 = new THREE.Scene(); 

    camera1 = new THREE.PerspectiveCamera( 23, window.innerWidth / window.innerHeight, 1, 100000 );
    camera1.position.z = 6000;
    scene.add( camera1 ); 

    camera2 = new THREE.PerspectiveCamera( 23, window.innerWidth / window.innerHeight, 1, 100000 );
    camera2.position.z = 2000;
    scene.add( camera2 ); 

    camera3 = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 100000);
    camera3.position.set(300,300,-57);
    scene.add( camera3 ); 

    walls();
      
    //renderer = new THREE.WebGLRenderer({ clearAlpha: 1 });  
    renderer = new THREE.WebGLRenderer({ antialias: true  });  
    renderer.setSize( window.innerWidth * 1, window.innerHeight * 1 );  

    renderer3  = new THREE.WebGLRenderer({ antialias: true });
    renderer3.setSize(window.innerWidth * 0.95, window.innerHeight * 0.95);
 

    controls2 = new THREE.OrbitControls(camera2, renderer.domElement); 
    //controls.minPolarAngle = Math.PI / 2;     //ToDo - Limits on Controls
    //controls.maxPolarAngle = Math.PI / 2; 
    controls3 = new THREE.OrbitControls(camera3, renderer3.domElement);
    //controls.minPolarAngle = Math.PI / 2; //ToDo - Limits on Controls
    controls3.maxPolarAngle = Math.PI / 2;

    container.appendChild( renderer.domElement );  
    container3.appendChild( renderer3.domElement );
}

//Window Resizse
    window.addEventListener( 'resize', onWindowResize, false ); 
    function onWindowResize(){ 
        scene.aspect = window.innerWidth / window.innerHeight; 
        updateScene3DCam();  //ToDo is this causing slow down? No it doesn't setup a loop it's just an additional call
        renderer.setSize( window.innerWidth, window.innerHeight ); 

        scene3.aspect = window.innerWidth / window.innerHeight; 
        renderer3.setSize( window.innerWidth, window.innerHeight ); 
    }
    
//Setup Stats
    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );
/////////////////////////////////////////////////////////

//Animate Functions
//ToDo should the animate be turned on off or could scene renderers achieve this better
    function animate() {  
        if (appFlags.cameraToggleFlag == false) {
            //console.log('--scene1'); 
            renderer.render(scene, camera1);
            stats.update(); 
            requestAnimationFrame( animate ); 
        }else {
            //console.log('--scene2');    
            renderer.render(scene, camera2); 
            stats.update();  
            controls2.update();
            requestAnimationFrame( animate );
        }  
    }

    function animate3() { 
        //appFlags.animation3RunOnce = true;
        requestAnimationFrame(animate3);
        controls3.update();
        renderer3.render(scene3, camera3); 
        //console.log(camera3.position);
        //console.log(camera3.position.x.toFixed(1) + ',' + camera3.position.y.toFixed(1) + camera3.position.z.toFixed(1));
    }
/////////////////////////////////////////////////////////

//Runtime
init();
animate(); 
animate3()
console.log("--here we go array !!!!"); 
//loadNotes();

///////////////////////////////////////////////////////
 
function addJSONtoArray (ntp,instrument) { 
    var noteTemp = {               //Object properites from Tone.js Notes
        duration: ntp.duration,
        durationTicks: ntp.durationTicks,
        midi: ntp.midi,
        name: ntp.name, 
        ticks: ntp.ticks, 
        time: ntp.time,
        velocity: ntp.velocity,  
        playOnce : false,
        playOnceStage1 : false,
        playOnceStage3 : false,
        note: "A",
        octave: 4,
        colour: 0xFF0000,
        x_cam : 0.0,
        y_cam : 0.0,
        x_r: 0.0,
        y_r: 0.0,
        rotation: 0.0,
        scale : 0.0,
        noteThreeCylinder: {} 
    }   
    if (noteTemp.name.charAt(1) == "#")    { 
        noteTemp.note = noteTemp.name.charAt(0) + noteTemp.name.charAt(1);
        noteTemp.octave = noteTemp.name.charAt(2);
    }
    else{
         //console.log('--natural');
        noteTemp.note = noteTemp.name.charAt(0);
        noteTemp.octave = noteTemp.name.charAt(1);
    } 

    noteTemp.colour = getColourOfNotes(noteTemp.note);      
    noteTemp.instrument = instrument; 

    noteTemp.noteThreeCylinder =  new THREE.Mesh( 
        new THREE.CylinderGeometry( 10, //Radius Top
                                    30, //Radius Bottom
                                    noteTemp.duration * 20,     //Height
                                    20,1,false,0,6.3), 
        new THREE.MeshBasicMaterial( { color : noteTemp.colour} ) ) 
    return noteTemp;
}


function loadNotes(cAndFs){       
        notes01 = []; 
        notes02 = [];
        console.log('--'+ cAndFs.name + ' --loadNotes');
       // console.log(notes01);
        var ntp1 = audio.channel_L_json;
        var ntp2 = audio.channel_R_json;
       // console.log(ntp1.length);
        //console.log(ntp2.length);
        
        //  Length of Longest Track needs to be used for counter
        // Conditional to prevent empty additions to shorter array
        for ( k=0 ; k < ntp1.length ; k++ ){ 
            var noteTemp12 = addJSONtoArray(ntp1[k],0);
            notes01.push(noteTemp12);  
        } 
        for ( g=0 ; g < ntp2.length ; g++ ){ 
            var noteTemp23 = addJSONtoArray(ntp2[g],1);
            notes02.push(noteTemp23); 
        }  

   // console.log(notes01);
    console.log('notes01.length = '+ notes01.length);
    console.log('notes02.length = '+ notes02.length);
    console.log('audio.channel_L_json = '+ audio.channel_L_json.length);
    console.log('audio.channel_R_json = '+ audio.channel_R_json.length);
   // console.log('notes01[0].playOnce = ' + notes01[0].playOnce);   

    }
 
  
function placeNotesInArrayInScene (note,noteArrayID,currentTime,cAndF) {    
    note.noteThreeCylinder.position.x = convertInstrumenttoX(note.instrument);
    note.noteThreeCylinder.position.y = convertNoteToY_Array(note.note);
    note.noteThreeCylinder.position.z = convertNoteToZ_Time(note.time,currentTime);
    scene.add( note.noteThreeCylinder );   
 
    let _time = convertMillisToMinutesAndSeconds(currentTime); 
        
    if (audio.channel_L_mp3.state == "stopped")   { audio.channel_L_mp3.start();  } 
    if (audio.channel_R_mp3.state == "stopped")   { audio.channel_R_mp3.start();  }  

    if (( note.time < _time ) && (_time < (note.time + note.duration)) ) {  
            
            if ((note.playOnce == false) && (noteArrayID == 0)) { //ToDo - Rads as a global constant
               /*ToDo - Stage2 Effects Stage3
                note.x_r = (stateOfAR.rx * 57.296).toFixed(2);  //Orientation at Start of Note
                note.y_r = (stateOfAR.ry * 57.296).toFixed(2);  //Both it should be the middle/Aveager(meanSum?)  //did your attention get drawn or wane
                
                note.x_cam = parameters.camController_x;
                note.y_cam = parameters.camController_y;
                note.playOnce = true;  
                */
                note.playOnce = true; 
                cAndF.notes01counter++; 
                //Debug Comment
                console.log('L - ' + cAndF.notes01counter + ' of ' + audio.channel_L_json.length + '  ' + note.name + '  ' + note.time.toFixed(2) + ' ' + _time);
              //  document.getElementById('noteLeft').innerHTML = note.name;
 
                if (cAndF.notes01counter == audio.channel_L_json.length - 3){    //not finishing bug
               
                    cAndF.notes01Flag = true ;
                }
            } 
              

            if ((note.playOnce == false) && (noteArrayID == 1)) {  
                note.playOnce = true; 
                cAndF.notes02counter++; 
                console.log('R - ' + cAndF.notes02counter + ' of ' + audio.channel_R_json.length + '  ' + note.name + '  ' + note.time.toFixed(2) + ' ' + _time);
               // document.getElementById('noteRight').innerHTML = note.name;
 
                if (cAndF.notes02counter == audio.channel_R_json.length - 3){
                    cAndF.notes02Flag = true
                }
            } 

            if (cAndF.bothFinished() == true) { 
                cAndF.songIsOverFlag = true;
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
            //ToDo look at the scene how it's different in each Stage if Populated
            //Stage 2 is add all the time and keep it moving
            //Stage 3 is all only once and leave it there
            //But where is Stage 2 cleared?
            //What loads the inital Scene in Stage3?
        }  
}

 
function updateScene3DCamera2 () {
    /*
        console.log("--updateScene3DCamera2()");
    */
} 


function updateScene3DCam () { 
    //console.log("--updateScene3DCam()");
    parameters.camController_x = (parameters.x1 * mappings.webCam2Scene3DCam_x).toFixed(2);
    parameters.camController_y = (parameters.y1 * mappings.webCam2Scene3DCam_y).toFixed(2);

    cam.controllers.three.realisticAbsoluteCameraControl( 
        camera1, 27, [   
                        parameters.camController_x,
                        -(parameters.camController_y + parameters.y1Offset),
                        parameters.cameraPositionZ
                        //ToDo - Add Z depth to cam // parameters.cameraPositionZ - (parameters.demo_cube_z * 300) //- 400
                    ], 
        new THREE.Vector3(0,0,0), //ToDo this might be where the Camera could be translated/panned/moved
        {damping : 0.5}
    );  
} 
//ToDo - what does this do?
cam.controllers.three.realisticAbsoluteCameraControl(camera1, 27, [0,0,50], new THREE.Vector3(0,0,0), {damping : 0.5});
//cam.controllers.three.realisticAbsoluteCameraControl(camera2, 27, [0,0,50], new THREE.Vector3(0,0,0), {damping : 0.5});
 
