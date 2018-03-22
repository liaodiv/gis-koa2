import React,{Component} from 'react';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import {drawGrid} from '../actions/threeUtil';

CameraControls.install({THREE:THREE});

window.THREE = THREE;
class ThreeView extends Component{
	constructor(props){
		super(props)
/*		const width = window.innerWidth;
		const height = window.innerHeight;

		this.camera = new THREE.PerspectiveCamera(70,width/height,0.01)
		this.scene = new THREE.Scene();
		this.scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );

		let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
		let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		let mesh  =new THREE.Mesh(geometry,material);

		this.scene.add(mesh);
		this.renderer = new THREE.WebGLRenderer({antialias:true})*/
	}
	componentDidMount(){
		const container = document.getElementById('three');

		const width = window.innerWidth;
		const height = window.innerHeight;

		this.camera = new THREE.PerspectiveCamera(45,width/height,1,4000)
		this.camera.position.set( -200, 200, -150 );
		this.scene = new THREE.Scene();

		this.scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );

		this.scene.add( new THREE.AmbientLight( 0x222222 ) );

	/*	let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
		let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		let mesh  =new THREE.Mesh(geometry,material);

		this.scene.add(mesh);*/


		this.renderer = new THREE.WebGLRenderer({antialias:true})
		this.renderer.setClearColor( this.scene.fog.color, 1 );
		this.renderer.setSize(window.innerWidth,window.innerHeight - 55);

		this.camreaControls = new CameraControls(this.camera,this.renderer.domElement);
		/*this.camreaControls.target.set(0,0,0);*/

		this.renderer.render(this.scene,this.camera)
		container.appendChild(this.renderer.domElement)

		drawGrid(this.scene,1000,0.01,"x");
		drawGrid(this.scene,1000,0.01,"y");
		drawGrid(this.scene,1000,0.01,"z")

			 const anim = () => {
				const needUpdate = this.camreaControls.update()
				 window.requestAnimationFrame(anim);
				if(needUpdate){
					this.renderer.render(this.scene,this.camera);
				}
			 }

			 anim();
		this.draw();

	}
	init(){
		const width = window.innerWidth;
		const height = window.innerHeight;



	}

	draw(){
		let cube;
		let cubeSizeLength = 100;
		let goldColor = "#FFDF00";
		let showFrame = true;
		let wireMaterial = new THREE.MeshBasicMaterial( { color: goldColor, wireframe: showFrame } ) ;

		let cubeGeometry = new THREE.CubeGeometry(cubeSizeLength, cubeSizeLength, cubeSizeLength);

		cube = new THREE.Mesh( cubeGeometry, wireMaterial );
		cube.position.x = 0;	// centered at origin
		cube.position.y = 0;	// centered at origin
		cube.position.z = 0;	// centered at origin
		this.scene.add( cube );
	}

	render(){
		return (
			<div style={{'height':'100%','width':'100%'}} id="three"></div>
		)
	}
}

export default ThreeView;