var obj_body = null;
var controls = null;
var earth_radius = 25;
var latitude_segments = 32;
var longitude_segments = 32;
var /*const*/ loading_manager = new THREE.LoadingManager();
var /*const*/ texsture_loader = new THREE.TextureLoader(loading_manager);

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
	var percentComplete = itemsLoaded / itemsTotal * 100;
	console.log(Math.round(percentComplete, 2) + '% downloaded');
};

var /*const*/ earth_texture = texsture_loader.load('./src/texture/earth_map_texture.gif');

ThreeInit();

function ThreeInit () {
	window.onload = function () {
		var /*const*/ scene = new THREE.Scene();
		var /*const*/ camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
		var /*const*/ renderer = new THREE.WebGLRenderer({ antialias: true });

		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x000000); // 0xCFCFCF

		document.body.appendChild(renderer.domElement);

		camera.position.z = 50;

		THREEx.WindowResize(renderer, camera);
		
		var /*const*/ cam_orbit_control = new THREE.OrbitControls(camera);
		cam_orbit_control = new THREE.OrbitControls(camera);
		cam_orbit_control.autoRotate = false;
		//cam_orbit_control.autoRotateSpeed = 1.111;
		cam_orbit_control.enablePan = false;
		cam_orbit_control.maxPolarAngle = 2.34;
		cam_orbit_control.minPolarAngle = .567;
		cam_orbit_control.enableDamping = true;

		var /*const*/ earth_geometry = new THREE.SphereGeometry(
			earth_radius,
			latitude_segments,
			longitude_segments
		);
		var /*const*/ earth_material = new THREE.MeshBasicMaterial({
				color: 0xFFFFFF,
				map: earth_texture
			}
		);
		var /*const*/ earth = new THREE.Mesh( earth_geometry, earth_material );

		scene.add( earth );

		var /*const*/ render = function () {
			requestAnimationFrame(render);
			earth.rotation.y += .005;
			cam_orbit_control.update();
			//camera.rotation.z = 0.4091; // angle of inclination of the earth's axis (23.44° to radian)
			renderer.render(scene, camera);
		};

		render();
	}
}