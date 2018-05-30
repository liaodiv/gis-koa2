import * as THREE from 'three';
/// TODO 用圆柱和球体模拟
export default sence => {
	const sphereMaterial = new THREE.MeshLambertMaterial( { color: 0x004040 } );
	const cube = new THREE.Mesh(
		new THREE.CylinderGeometry(5,5,344,32),
		sphereMaterial
	);

	cube.position.x = 0
	cube.position.y = 0;
	cube.position.z = 3;

	sence.add(cube);
	function update() {

	}
	return {
		update
	}
}