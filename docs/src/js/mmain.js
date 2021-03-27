import * as THREE from 'https://moroz69off.github.io/earththreed/three/three.module.js';
var /*const*/ scene = null;
var /*const*/ camera = null;
var /*const*/ renderer = null;
var /*const*/ earth_radius = 25;
var /*const*/ latitude_segments = 32;  //широта
var /*const*/ longitude_segments = 32; //долгота
var /*const*/ loading_manager = new THREE.LoadingManager();
var /*const*/ texsture_loader = new THREE.TextureLoader(loading_manager);
var /*const*/ camera_orbit_control = null;

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
		renderer.setClearColor(0xCFCFCF);
		
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
		scene.add( earth );

		camera.position.z = 50;

		function animate() {
			requestAnimationFrame( animate );
			//===ANIMATION HERE=====

			earth.rotation.y += .005;
			console.log('!!!!!!!!!!');

			//====END ANIMATION=====
			renderer.render( scene, camera );
		}
		animate();
	}
}
