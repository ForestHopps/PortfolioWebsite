import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextureLoader } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.5, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render( scene, camera );

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshStandardMaterial( { color: 0xC11101 } );
const torus = new THREE.Mesh( geometry, material);


scene.add(torus)
torus.position.z = -10;
torus.position.x = 10;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

function addStar() {
 const geometry = new THREE.SphereGeometry(0.25, 24, 24);
 const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
 const star = new THREE.Mesh( geometry, material );

 const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 200 ) );

 star.position.set(x, y, z);
 scene.add(star)
}

Array(400).fill().forEach(addStar)

//background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

//moon
const moonTexture = new THREE.TextureLoader().load('planet.jpg'); 
const moonNormal = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: moonNormal 
  })
);

scene.add (moon);

moon.position.z = 1;
moon.position.x = -10;

//Move camera on scroll
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.00005;
  moon.rotation.y += 0.000075;
  moon.rotation.z += 0.00005;

  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  camera.position.z = t * -0.01;
}

document.body.onscroll = moveCamera;
moveCamera();


function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;
  
  renderer.render( scene, camera );
}

animate();




