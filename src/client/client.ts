import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'



var buttons = document.getElementsByTagName("button");

var select = document.getElementById('models') as HTMLSelectElement;
var value = ''

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", onButtonClick, false);
};

function onButtonClick() {
    console.log('button: '+counter1.model)
    let s = select.options[select.selectedIndex].value;
    value = s.substr(s.lastIndexOf('.') + 1);
    counter1.model = s
    console.log('button: '+counter1.model)
    console.log("fileextension: "+value);
  loadModel();
}

let counter1 = {model:'models/model1.gltf'};

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const light = new THREE.SpotLight()
light.position.set(5, 5, 5)
scene.add(light)


const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.5 );
scene.add( directionalLight );

const directionalLight1 = new THREE.DirectionalLight( 0xffffff, 1.5 );
directionalLight1.position.set(0,-1,0);
scene.add( directionalLight1 );

const camera = new THREE.PerspectiveCamera(
    75,
    2,
    0.1,
    1000
)
camera.position.z = 5
camera.position.y = 2
const canvas1 = document.getElementById('artifactCanvas') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer( { canvas: canvas1 })
//renderer.setSize(400, 300)
renderer.physicallyCorrectLights = true
// renderer.shadowMap.enabled = true
renderer.outputEncoding = THREE.sRGBEncoding
//renderer.setSize(window.innerWidth, window.innerHeight)
//document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
//controls.addEventListener('change', render)
let model1 = new THREE.Group
const loader = new GLTFLoader()
const objLoader = new OBJLoader()

function loadModel() {
    scene.remove(model1)
    let mymodel = counter1.model
    console.log('Modelname is: '+mymodel)

    if ((value == 'obj')|| (value == 'OBJ')){
        objLoader.load(mymodel , function ( obj ) {

            //waltHead = obj;
            //waltHead.scale.multiplyScalar( 1.5 );
            //waltHead.position.set( 400, 0, 0 );
            model1 = obj
            scene.add( model1 )

        },
        // called when loading is in progresses
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        } 
        );
    }else {
        loader.load(
        mymodel,
        function (gltf) {
            
            model1 = gltf.scene
            
            scene.add(model1)
            
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log("GLTF Error is: "+error)
            
            
        }
        
        )
    }

}

function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width ||canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
  
      // set render target sizes here
    }
  }

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    resizeCanvasToDisplaySize();
    render()
}
onWindowResize()
/*
const stats = Stats()
document.body.appendChild(stats.dom)
*/

/*
const gui = new GUI()
*/
/*
const modelfolder = gui.addFolder('Model Scale')
modelfolder.add(model1.scale,'x',-10,10,.1)
modelfolder.add(model1.scale,'y',-10,10,.1)
modelfolder.add(model1.scale,'z',-10,10,.1)
*/
/*
const modelnumber = gui.addFolder('Model (Name is model+number, eg. model1')
modelnumber.add(counter1,'num',1,100,1)
modelnumber.open()
*/
loadModel()


function animate() {
    requestAnimationFrame(animate)

    controls.update()
    //stats.update()
    resizeCanvasToDisplaySize();

    render()

    
}

function render() {
    renderer.render(scene, camera)
}

animate()