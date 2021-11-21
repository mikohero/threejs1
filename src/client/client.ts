import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'



var buttons = document.getElementsByTagName("button");

var select = document.getElementById('models') as HTMLSelectElement;
//var value = select.options[select.selectedIndex].value;

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", onButtonClick, false);
};

function onButtonClick() {
    console.log('button: '+counter1.model)
    let s = select.options[select.selectedIndex].value;
    counter1.model = s
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
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 5
camera.position.y = 2
const canvas1 = document.getElementById('artifactCanvas') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer( { canvas: canvas1 })
renderer.setSize(400, 300)
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
    loader.load(
        mymodel,
        function (gltf) {
            // gltf.scene.traverse(function (child) {
            //     if ((child as THREE.Mesh).isMesh) {
            //         const m = (child as THREE.Mesh)
            //         m.receiveShadow = true
            //         m.castShadow = true
            //     }
            //     if (((child as THREE.Light)).isLight) {
            //         const l = (child as THREE.Light)
            //         l.castShadow = true
            //         l.shadow.bias = -.003
            //         l.shadow.mapSize.width = 2048
            //         l.shadow.mapSize.height = 2048
            //     }
            // })
            /*
            gltf.scene.scale.multiplyScalar(1 / 100); // adjust scalar factor to match your scene scale
            gltf.scene.position.x = 0; // once rescaled, position the model where needed
            gltf.scene.position.z = 0;
            */
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

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
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

    render()

    
}

function render() {
    renderer.render(scene, camera)
}

animate()