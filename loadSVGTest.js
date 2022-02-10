console.log("LOADING loadSVGTest.js");
import { SVGLoader } from "./SVGLoader.js";
import {scene} from "./main.js";

let overlay;
let algOverLay = false;

let overlaySource = "img/cube3x3/cfop/default-overlay.svg";


export function createAlgorithmOverlay(){
	const loader = new SVGLoader();
	loader.load(
		// resource URL
		overlaySource,
		// called when the resource is loaded
		function ( data ) {
	
			const paths = data.paths;
			const group = new THREE.Group();
	
			console.log("DATA: ");
			console.log(data);
	
	
	
	
			// CREATE ARROWS
			console.log("DATA XML: ");
			console.log(data.xml);
			let xmlData = data.xml;
	
			if(xmlData.getElementById('arrow') != null){
				let arrow = xmlData.getElementById('arrow');
				let arrowArray = arrow.children;
				console.log(arrowArray);
	
				for ( let i = 0; i < arrowArray.length; i ++ ) {
	
					for( let j = 0; j < data.paths.length; ++j){
						console.log("VERGLEICH: " + data.paths[j].userData.node);
						console.log("MIT: " + arrowArray[i])
						if(data.paths[j].userData.node == arrowArray[i]){
	
							let path = data.paths[j];
							console.log("PATH: ");
							var customColor;
	
							console.log(path);
	
							customColor = new THREE.Color("rgb(0,0,0)");
			
							const material = new THREE.MeshBasicMaterial( {
								color: customColor,
								side: THREE.DoubleSide
							} );
	
							material.transparent = true;
							material.opacity = 1;
				
							const shapes = SVGLoader.createShapes( path );
				
							for ( let j = 0; j < shapes.length; j ++ ) {
				
								const shape = shapes[ j ];
								const geometry = new THREE.ShapeGeometry(shape);
								const mesh = new THREE.Mesh( geometry, material );
								mesh.position.z = -11;
								group.add( mesh );
							}
						}
					}
				}
			}
	
			if(xmlData.getElementById('edge') != null){
				let edge = xmlData.getElementById('edge');
				let edgeArray = edge.children;
				console.log(edgeArray);
	
				for ( let i = 0; i < edgeArray.length; i ++ ) {
	
					for( let j = 0; j < data.paths.length; ++j){
						console.log("VERGLEICH: " + data.paths[j].userData.node);
						console.log("MIT: " + edgeArray[i])
						if(data.paths[j].userData.node == edgeArray[i]){
							let path = data.paths[j];
							console.log("PATH: ");
						var customColor;
	
						console.log(path);
	
							customColor = new THREE.Color("rgb(0, 0, 0)");
			
							const material = new THREE.MeshBasicMaterial( {
								color: customColor,
								side: THREE.DoubleSide
							} );
	
							material.transparent = true;
							material.opacity = 0.5;
				
							const shapes = SVGLoader.createShapes( path );
				
							for ( let j = 0; j < shapes.length; j ++ ) {
				
								const shape = shapes[ j ];
	
								const extrudeSettings = {
									steps: 2,
									depth: 45,
									bevelEnabled: false,
									bevelThickness: 2,
									bevelSize: 2,
									bevelOffset: 0,
									bevelSegments: 4
								};
			
								
								const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
								const mesh = new THREE.Mesh( geometry, material );
	
								mesh.position.z = -16;
			
								group.add( mesh );
							}
						}
					}
				}
			}
	
			if(xmlData.getElementById('top') != null){
				let top = xmlData.getElementById('top');
				let topArray = top.children;
				console.log(topArray);
		
				for ( let i = 0; i < topArray.length; i ++ ) {
		
					for( let j = 0; j < data.paths.length; ++j){
						console.log("VERGLEICH: " + data.paths[j].userData.node);
						console.log("MIT: " + topArray[i])
						if(data.paths[j].userData.node == topArray[i]){
							let path = data.paths[j];
							console.log("PATH: ");
						var customColor;
		
						console.log(path);
		
							customColor = new THREE.Color("rgb(0, 0, 0)");
			
							const material = new THREE.MeshBasicMaterial( {
								color: customColor,
								side: THREE.DoubleSide
							} );
		
							material.transparent = true;
							material.opacity = 0.5;
				
							const shapes = SVGLoader.createShapes( path );
				
							for ( let j = 0; j < shapes.length; j ++ ) {
				
								const shape = shapes[ j ];
		
								const extrudeSettings = {
									steps: 2,
									depth: 10,
									bevelEnabled: false,
									bevelThickness: 2,
									bevelSize: 2,
									bevelOffset: 0,
									bevelSegments: 4
								};
			
								
								const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
								const mesh = new THREE.Mesh( geometry, material );
			
								mesh.position.z = 5;
								group.add( mesh );
							}
						}
					}
				}	
			}
	
			group.name = "Overlay";
	
			let scaleVector = new THREE.Vector3(0.5,0.5,0.5);
	
			group.scale.set(0.0353,0.0353,0.0353);
			group.position.x = -5;
			group.position.y = -5;
			group.position.z = 3.4;
	
			overlay = group;
			scene.add( group );
			console.log(scene.children);
			rotateOverlay();
	
		},
		// called when loading is in progresses
		function ( xhr ) {
	
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	
		},
		// called when loading has errors
		function ( error ) {
	
			console.log( 'An error happened' );
	
		}
	);
}



function rotateOverlay(){
	console.log(overlay);
	for(let i = 0; i < overlay.children.length; ++i){
		const vectorZ = new THREE.Vector3(0,0,1);
		let angleJ = THREE.Math.degToRad(90);
		overlay.children[i].rotateOnWorldAxis(vectorZ, angleJ);

		let angleI = THREE.Math.degToRad(180);
		const vectory = new THREE.Vector3(0,1,0);
		overlay.children[i].rotateOnWorldAxis(vectory, angleI);
	}
}

export function toggleAlgOverlay(){
	
	algOverLay =! algOverLay;
	console.log("toggleAlgOverlay: " + algOverLay);

	if(algOverLay == true){
		createAlgorithmOverlay();
	}else{
		scene.remove(overlay);
	}
}

export function updateAlgOverlay(source){

	if(algOverLay == true){
		overlaySource = source;
		scene.remove(overlay);
		createAlgorithmOverlay();
	}

}