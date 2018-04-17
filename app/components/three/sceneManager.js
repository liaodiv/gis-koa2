import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);
import CameraControls from 'camera-controls';
import SceneSubject from './sceneSubject';
import GeneralLights from './generalLights';
import MapSubject from './sceneMap';
import PipeSubject from './pipeSubject';

//CameraControls.install({THREE:THREE});


export default canvas => {

	const clock = new THREE.Clock();
	const origin = new THREE.Vector3(0,0,0);

	const screenDimensions = {
		width: canvas.width,
		height: canvas.height
	}

	console.log(screenDimensions);

	const mousePosition = {
		x: 0,
		y: 0
	}

	const scene = buildScene();
	const renderer = buildRender(screenDimensions);
	const camera = buildCamera(screenDimensions);
	const sceneSubjects = createSceneSubjects(scene);

	const controls = new OrbitControls(camera);

	function buildScene() {
		const scene = new THREE.Scene();
		//scene.background = new THREE.Color("#FFF");
		scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );

		return scene;
	}

	function buildRender({ width, height }) {
		const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
		const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
		renderer.setPixelRatio(DPR);
		renderer.setSize(width, height);
		renderer.setClearColor( 0x808080,1)

		renderer.gammaInput = true;
		renderer.gammaOutput = true;

		return renderer;
	}

	function buildCamera({ width, height }) {
		const aspectRatio = width / height;
		const fieldOfView = 60;
		const nearPlane = 2;
		const farPlane = 2000;
		const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

		camera.position.z = 40;

		return camera;
	}

	function createSceneSubjects(scene) {
		const sceneSubjects = [
			new GeneralLights(scene),
			/*new SceneSubject(scene),*/
			new MapSubject(scene),
			new PipeSubject(scene)
		];

		return sceneSubjects;
	}

	function update() {
		const elapsedTime = clock.getElapsedTime();
		const delta = clock.getDelta();
			for (let i = 0; i < sceneSubjects.length; i++)
				sceneSubjects[i].update(elapsedTime);

			//updateCameraPositionRelativeToMouse();

			renderer.render(scene, camera);

	}

	function updateCameraPositionRelativeToMouse() {
		camera.position.x += (  (mousePosition.x * 0.01) - camera.position.x ) * 0.01;
		camera.position.y += ( -(mousePosition.y * 0.01) - camera.position.y ) * 0.01;
		camera.lookAt(origin);
	}

	function onWindowResize() {
		const { width, height } = canvas;

		screenDimensions.width = width;
		screenDimensions.height = height;

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		renderer.setSize(width, height);
	}

	function onMouseMove(x, y) {
		mousePosition.x = x;
		mousePosition.y = y;
	}

	return {
		update,
		onWindowResize,
		onMouseMove
	}
}