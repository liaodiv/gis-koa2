import * as THREE from 'three';

export function drawGrid(scene,size,scale,axis) {
	let grid = new THREE.Mesh(
		new THREE.PlaneGeometry(size,size,size * scale, size * scale),
		new THREE.MeshBasicMaterial({
			color:'0x555555',
			wireframe:true
		})
	);

	if (axis === "x") {
		grid.rotation.x = - Math.PI / 2;
	} else if (axis === "y") {
		grid.rotation.y = - Math.PI / 2;
	} else if (axis === "z") {
		grid.rotation.z = - Math.PI / 2;
	}

	scene.add(grid)

}