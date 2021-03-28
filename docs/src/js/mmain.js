//import * as THREE from 'https://moroz69off.github.io/earththreed/three/three.module.js';

var /*const*/ scene = null;
var /*const*/ camera = null;
var /*const*/ renderer = null;
var /*const*/ earth_radius = 25;
var /*const*/ latitude_segments = 32;  //широта
var /*const*/ longitude_segments = 32; //долгота
var /*const*/ loading_manager = new THREE.LoadingManager();
var /*const*/ texsture_loader = new THREE.TextureLoader(loading_manager);
var /*const*/ camera_orbit_control = null;
var /*const*/ wrf = null;

var WR = THREEx;

loading_manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

loading_manager.onLoad = function ( ) {
	console.log( 'Loading complete!');
};

loading_manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url );
};

loading_manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

const earth_map = texsture_loader.load('./src/texture/earth_map_texture.gif');

ThreeInit();

function ThreeInit () {
	window.onload = function () {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
			canvas: document.getElementById('c')
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x000000);//0xCFCFCF or 0x000000
		
		const earth_geometry = new THREE.SphereGeometry(
			earth_radius,
			latitude_segments,
			longitude_segments
		);
		const earth_material = new THREE.MeshBasicMaterial({
			color: 0xFFFFFF,
			map: earth_map
		});
		const earth = new THREE.Mesh( earth_geometry, earth_material );
		camera.rotation.z = 0.4091; // angle of inclination of the earth's axis (23.44° to radian)
		scene.add( earth );

		camera.position.z = 50;

		wrf = new WR.WindowResize(renderer, camera);

		camera_orbit_control = new THREE.OrbitControls(camera);
		camera_orbit_control.autoRotate = true;
		camera_orbit_control.enablePan = false;
		camera_orbit_control.maxPolarAngle = 2.34;
		camera_orbit_control.minPolarAngle = .567;

		//camera_orbit_control.enableDamping = true;

		let canvasus = document.getElementById('c');
		canvasus.onclick = function(event) {
			console.log(event);
		}



		//console.log(camera_orbit_control);

		function animate() {
			requestAnimationFrame( animate );
			//===ANIMATION HERE=====
			camera_orbit_control.update();
			//====END ANIMATION=====
			renderer.render( scene, camera );
		}
		animate();
	}
}
