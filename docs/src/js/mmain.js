const earth_radius = 25;
const latitude_segments = 32;
const longitude_segments = 32;
const loading_manager = new THREE.LoadingManager();
const texsture_loader = new THREE.TextureLoader(loading_manager);

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

const earth_texture = texsture_loader.load('./src/texture/earth_map_texture.gif');
const wreathe_texture = texsture_loader.load('./src/texture/welt_clouds_map.gif');
const wreathe_texture_inverse = texsture_loader.load('./src/texture/welt_clouds_map_inverse.gif');

ThreeInit();

function ThreeInit () {
	window.onload = function () {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
		const renderer = new THREE.WebGLRenderer({ antialias: true });

		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x000000);

		document.body.appendChild(renderer.domElement);

		camera.position.z = 50;

		THREEx.WindowResize(renderer, camera);
		
		const cam_orbit_control = new THREE.OrbitControls(camera);
		cam_orbit_control.autoRotate = false;
		cam_orbit_control.enablePan = false;
		cam_orbit_control.maxPolarAngle = 2.34;
		cam_orbit_control.minPolarAngle = .567;
		cam_orbit_control.enableDamping = true;

		const earth_geometry = new THREE.SphereGeometry(
			earth_radius,
			latitude_segments,
			longitude_segments
		);
		const earth_material = new THREE.MeshBasicMaterial({
				color: 0xFFFFFF,
				map: earth_texture
			}
		);
		const earth = new THREE.Mesh( earth_geometry, earth_material );

		const welt_clouds_geometry = new THREE.SphereGeometry(
			earth_radius + .777,
			latitude_segments,
			longitude_segments
		);
		const welt_clouds_material = new THREE.MeshBasicMaterial({
				color: 0xFFFFFF,
				map:  wreathe_texture,
				transparent: true,
				alphaTest: .5,
				opacity : 1,
				alphaMap: wreathe_texture
			}
		);
		const welt_clouds = new THREE.Mesh( welt_clouds_geometry, welt_clouds_material );

		scene.add( earth );
		scene.add( welt_clouds );

		const render = function () {
			requestAnimationFrame(render);
			earth.rotation.y += .00251;
			welt_clouds.rotation.y += .0025;
			cam_orbit_control.update();
			renderer.render(scene, camera);
		};

		render();
	}
}