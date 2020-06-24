/**
 * headtrackr library (https://www.github.com/auduno/headtrackr/)
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */ 
/**
 * Optional controllers for handling headtrackr events
 *
 * @author auduno / github.com/auduno
 */
var cam = {};

cam.controllers = {};

// NB! made for three.js revision 48. May not work with other revisions.

cam.controllers.three = {};

/**
 * Controls a THREE.js camera to create pseudo-3D effect
 *
 * Needs the position of "screen" in 3d-model to be given up front, and to be static (i.e. absolute) during headtracking
 *
 * @param {THREE.PerspectiveCamera} camera
 * @param {number} scaling The scaling of the "screen" in the 3d model. 
 *   This is the vertical size of screen in 3d-model relative to vertical size of computerscreen in real life
 * @param {array} fixedPosition array with attributes x,y,z, position of "screen" in 3d-model
 * @param {THREE.Vector3} lookAt the object/position the camera should be pointed towards
 * @param {object} params optional object with optional parameters
 *
 * Optional parameters:
 *   screenHeight : vertical size of computer screen (default is 20 cm, i.e. typical laptop size)
 */
cam.controllers.three.realisticAbsoluteCameraControl = function(camera, scaling, fixedPosition, lookAt, params) {
	
	if (params === undefined) params = {};
	if (params.screenHeight === undefined) {
		var screenHeight_cms = 20;
	} else {
		var screenHeight_cms = params.screenHeight;
	}
	if (params.damping === undefined) {
	  params.damping = 1;
	}
	
	camera.position.x = fixedPosition[0];
	camera.position.y = fixedPosition[1];
    camera.position.z = fixedPosition[2];
    
	camera.lookAt(lookAt);
	
	var wh = screenHeight_cms * scaling;
	var ww = wh * camera.aspect;
	
	document.addEventListener('headtrackingEvent', function(event) {
		
		// update camera
		var xOffset = event.x > 0 ? 0 : -event.x * 2 * params.damping * scaling;
		var yOffset = event.y < 0 ? 0 : event.y * 2 * params.damping * scaling;
		camera.setViewOffset(ww + Math.abs(event.x * 2 * params.damping * scaling), wh + Math.abs(event.y * params.damping * 2 * scaling), xOffset, yOffset, ww, wh);
		
		camera.position.x = fixedPosition[0] + (event.x * scaling * params.damping );
		camera.position.y = fixedPosition[1] + (event.y * scaling * params.damping );
		camera.position.z = fixedPosition[2] + (event.z * scaling);
		 
		// update lookAt?
		
		// when changing height of window, we need to change field of view
		camera.fov = Math.atan((wh/2 + Math.abs(event.y * scaling * params.damping ))/(Math.abs(event.z*scaling)))*360/Math.PI;
		//debugger;
		
		camera.updateProjectionMatrix();
		
	}, false);
};
 
 