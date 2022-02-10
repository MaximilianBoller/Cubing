

export let camera, scene, renderer, controls, spotlight;






export let cameraF;
export let cameraB;
export let cameraL;
export let cameraR;
export let cameraU;
export let cameraD;


var max = 3;
var Cube = new Array();

console.log(Cube);


let CubeViewer = document.getElementById('3DViewer');

import {GLTFLoader} from "./GLTFLoader.js";
import {OrbitControls} from "./OrbitControls.js";
import {toggleAlgOverlay} from "./loadSVGTest.js";
import { turnZSlice } from './cubeArray.js';
import { turnYSlice } from './cubeArray.js';
import { turnXSlice } from './cubeArray.js';
import { updateMirrorPlanes } from "./mirrorPlanes.js";
import {getSolve} from "./cubeAI.js";
import {scrambleCubeArray} from "./cubeArray.js";

function init() {

	scene = new THREE.Scene();
	// MAIN CAMERA
	camera = new THREE.PerspectiveCamera(
		60,
		CubeViewer.offsetWidth / CubeViewer.offsetHeight,
		0.1,
		1000
	);
	camera.position.z = 0;
	camera.position.y = 0;
	camera.position.x = 15;
	camera.lookAt(0,0,0);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(CubeViewer.offsetWidth, CubeViewer.offsetHeight);
	renderer.toneMapping = THREE.ReinhardToneMapping;
	renderer.toneMappingExposure = 2;
	renderer.shadowMap.enable = true;
	//renderer.outputEncoding = THREE.sRGBEncoding;

	CubeViewer.appendChild(renderer.domElement);

	turnFace('FULL');





	//loadArrow();
	//UNDO TO LOAD ROUND VIEW PLANES
	//loadRoundViewPlanes();













	// camera F
	cameraF = new THREE.PerspectiveCamera(
		20,
		1,
		0.1,
		1000
	);
	cameraF.position.z = 0;
	cameraF.position.y = 0;
	cameraF.position.x = 20;
	cameraF.lookAt(0,0,0);
	cameraF.rotateZ(THREE.Math.degToRad(90));
	scene.add(cameraF);

	// camera B
	cameraB = new THREE.PerspectiveCamera(
		20,
		1,
		0.1,
		1000
	);
	cameraB.position.z = 0;
	cameraB.position.y = 0;
	cameraB.position.x = -20;
	cameraB.lookAt(0,0,0);
	cameraB.rotateZ(THREE.Math.degToRad(90));
	scene.add(cameraB);

	// camera R
	cameraR = new THREE.PerspectiveCamera(
		20,
		1,
		0.1,
		1000
	);
	cameraR.position.z = 0;
	cameraR.position.y = 20;
	cameraR.position.x = 0;
	cameraR.lookAt(0,0,0);
	cameraR.rotateZ(THREE.Math.degToRad(180));
	scene.add(cameraR);

	// camera L
	cameraL = new THREE.PerspectiveCamera(
		20,
		1,
		0.1,
		1000
	);
	cameraL.position.z = 0;
	cameraL.position.y = -20;
	cameraL.position.x = 0;
	cameraL.lookAt(0,0,0);
	cameraL.rotateZ(THREE.Math.degToRad(180));
	scene.add(cameraL);

	// camera U
	cameraU = new THREE.PerspectiveCamera(
		20,
		1,
		0.1,
		1000
	);
	cameraU.position.z = 20;
	cameraU.position.y = 0;
	cameraU.position.x = 0;
	cameraU.lookAt(0,0,0);
	cameraU.rotateZ(THREE.Math.degToRad(180));
	scene.add(cameraU);

		
	// camera D
	cameraD = new THREE.PerspectiveCamera(
		20,
		1,
		0.1,
		1000
	);
	cameraD.position.z = -20;
	cameraD.position.y = 0;
	cameraD.position.x = 0;
	cameraD.lookAt(0,0,0);
	cameraD.rotateZ(THREE.Math.degToRad(180));
	scene.add(cameraD);







	// LIGHT
    var light = new THREE.HemisphereLight(0xffffff, 0xffffff, 3);
    scene.add(light);

	spotlight = new THREE.SpotLight(0xffa95c, 4);
	spotlight.castShadow = true;
	spotlight.position.set(10,10,10);
	scene.add(spotlight);

	scene.background = new THREE.Color(0xF1F1F1);



	//scene.rotateZ(THREE.Math.degToRad(-90));






	// HELPER
	const xAxsis = new THREE.Vector3(1,0,0);
	const yAxsis = new THREE.Vector3(0,1,0);
	const zAxsis = new THREE.Vector3(0,0,1);
	
	const origin = new THREE.Vector3( 0, 0, 0 );
	const length = 10;

	const red = 0xFD4938;
	const green = 0x69EA4F;
	const blue = 0x3A85F8;

	const xAxisHelper = new THREE.ArrowHelper( xAxsis, origin, length, red );
	const yAxisHelper = new THREE.ArrowHelper( yAxsis, origin, length, green );
	const zAxisHelper = new THREE.ArrowHelper( zAxsis, origin, length, blue );

	scene.add(xAxisHelper);
	scene.add(yAxisHelper);
	scene.add(zAxisHelper);
	
	camera.up.set(0,0,1);
	scene.add(camera);

	controls = new OrbitControls(camera, renderer.domElement);

}















// > ALGORITHM OVERLAY 
let overlayButton = document.getElementById('alg-overlay-button').addEventListener('click', toggleAlgOverlay);










let cubeDir = "./Cube/";
let cubeLayout = "FULL";

let cubeTypeFull = document.getElementById('cube-type-full').addEventListener("click", function(){turnFace("FULL")});
let cubeTypeFL = document.getElementById('cube-type-fl').addEventListener("click", function(){turnFace("FL")});
let cubeTypeF2L = document.getElementById('cube-type-f2l').addEventListener("click", function(){turnFace("F2L")});
let cubeTypeOLLPLL = document.getElementById('cube-type-oll-pll').addEventListener("click", function(){turnFace("OLL-PLL")});

function setCubeType(type){
	if(type == "full"){
		cubeLayout = "FULL";
	}
	
	if(type == "fl"){
		cubeLayout = "FL";
	}
	
	if(type == "f2l"){
		cubeLayout = "F2L";
	}
	
	if(type == "oll-pll"){
		cubeLayout = "OLL/PLL";
	}
	resetCube();


}


function loadCube(){

	let number = 0;
	const loader = new GLTFLoader();

	for(let layer = -1; layer <= 1; ++layer){
		for(let reihe = -1; reihe <= 1; ++reihe){
			for(let spalte = -1; spalte <=1; ++spalte)
			{
				number = number + 1;
				console.log("PIECE NUMBER " + number);

				if(cubeLayout == "FULL"){
					if(number <= 27){
						cubeDir = "./Cube/";
					}
				}

				if(cubeLayout == "FL"){
					if((number < 19 ^ number != 11) || (number < 19 ^ number != 13) || (number < 19 ^ number != 15) || (number < 19 ^ number != 17)){
						cubeDir = "./Cube/";
					}else{
						cubeDir = "./Cube Black/";
					}
				}

				if(cubeLayout == "F2L"){
					if(number <= 9){
						cubeDir = "./Cube Black/";
					}else{
						cubeDir = "./Cube/";
					}
				}

				if(cubeLayout == "OLL/PLL"){
					if(number <= 9){
						cubeDir = "./Cube/";
					}else{
						cubeDir = "./Cube Black/";
					}
				}

				let pathName = cubeDir + number + ".glb";
				console.log(pathName);

				loader.load(
					// resource URL
					pathName,
					// called when the resource is loaded
					function ( gltf ) {
						
						let cubePiece = gltf.scene;
						var positionVector = new THREE.Vector3(reihe * 2, spalte* 2, layer*2);

						cubePiece.position.copy(positionVector);
						cubePiece.name = "cube-piece";
						
						cubePiece.rotateX(THREE.Math.degToRad(90));

						cubePiece.castShadow = true;
						cubePiece.receiveShadow = true;
						/*
						cubePiece.rotateY(THREE.Math.degToRad(-90));
						cubePiece.rotateZ(THREE.Math.degToRad(-90));
						*/
						scene.add(cubePiece);
						console.log(pathName + " " + reihe *2+ " " + spalte*2 +" "+ layer*2);

						animationDone = animationDone + 1;
					},
					// called while loading is progressing
					function ( xhr ) {
						console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );					
					},
					// called when loading has errors
					function ( error ) {
				
						console.log( 'An error happened' );
					}
				);
			}
		}
	}
}

function loadArrow(){
	const loader = new GLTFLoader();
	loader.load(
		"./Cube/Arrow.glb",
		function ( gltf ) {
			
			let Arrow = gltf.scene;
			Arrow.position.set(5,0,-3);
			Arrow.rotateX(THREE.Math.degToRad(90));
			Arrow.rotateY(THREE.Math.degToRad(-90));
			Arrow.name = "arrow";
			scene.add(Arrow);
		},
		function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		function ( error ) {
			console.log( 'An error happened' );
		}
	);
}







let planeFRenderer = new THREE.WebGLRenderTarget(10,10, { format: THREE.RGBFormat});
let planeF;

let planeBRenderer = new THREE.WebGLRenderTarget(10,10, { format: THREE.RGBFormat});
let planeB;

let planeRRenderer = new THREE.WebGLRenderTarget(10,10, { format: THREE.RGBFormat});
let planeR;

let planeLRenderer = new THREE.WebGLRenderTarget(10,10, { format: THREE.RGBFormat});
let planeL;

let planeURenderer = new THREE.WebGLRenderTarget(10,10, { format: THREE.RGBFormat});
let planeU;

let planeDRenderer = new THREE.WebGLRenderTarget(10,10, { format: THREE.RGBFormat});
let planeD;

function loadRoundViewPlanes(){

	// plane F
	const planeFGeo = new THREE.PlaneGeometry( 6, 6 );
	const planeFMat = new THREE.MeshBasicMaterial({
		map: planeFRenderer.texture, side: THREE.BackSide
	});
	planeFMat.flatShading = true;
	planeF = new THREE.Mesh( planeFGeo, planeFMat );
	planeF.position.set(6,0,0);
	planeF.rotateX(THREE.Math.degToRad(90));
	planeF.rotateY(THREE.Math.degToRad(90));
	scene.add( planeF );

	// plane B
	const planeBGeo = new THREE.PlaneGeometry( 6, 6 );
	const planeBMat = new THREE.MeshBasicMaterial({
		map: planeBRenderer.texture, side: THREE.BackSide
	});
	planeBMat.flatShading = true;
	planeB = new THREE.Mesh( planeBGeo, planeBMat );
	planeB.position.set(-6,0,0);
	planeB.rotateX(THREE.Math.degToRad(-90));
	planeB.rotateY(THREE.Math.degToRad(-90));
	scene.add( planeB );

	// plane R
	const planeRGeo = new THREE.PlaneGeometry( 6, 6 );
	const planeRMat = new THREE.MeshBasicMaterial({
		map: planeRRenderer.texture, side: THREE.BackSide
	});
	planeRMat.flatShading = true;
	planeR = new THREE.Mesh( planeRGeo, planeRMat );
	planeR.position.set(0,6,0);
	planeR.rotateX(THREE.Math.degToRad(90));
	planeR.rotateY(THREE.Math.degToRad(-180));
	scene.add( planeR );

	// plane L
	const planeLGeo = new THREE.PlaneGeometry( 6, 6);
	const planeLMat = new THREE.MeshBasicMaterial({
		map: planeLRenderer.texture, side: THREE.BackSide
	});
	planeLMat.flatShading = true;
	planeL = new THREE.Mesh( planeLGeo, planeLMat );
	planeL.position.set(0,-6,0);
	planeL.rotateX(THREE.Math.degToRad(-90));
	planeL.rotateY(THREE.Math.degToRad(180));
	scene.add( planeL );

	// plane U
	const planeUGeo = new THREE.PlaneGeometry( 6, 6);
	const planeUMat = new THREE.MeshBasicMaterial({
		map: planeURenderer.texture, side: THREE.BackSide
	});
	planeUMat.flatShading = true;
	planeU = new THREE.Mesh( planeUGeo, planeUMat );
	planeU.position.set(0,0,6);
	planeU.rotateX(THREE.Math.degToRad(0));
	planeU.rotateY(THREE.Math.degToRad(0));
	planeU.rotateZ(THREE.Math.degToRad(180));

	scene.add( planeU );

	// plane D
	const planeDGeo = new THREE.PlaneGeometry( 6, 6);
	const planeDMat = new THREE.MeshBasicMaterial({
		map: planeDRenderer.texture, side: THREE.BackSide
	});
	planeDMat.flatShading = true;
	planeD = new THREE.Mesh( planeDGeo, planeDMat );
	planeD.position.set(0,0,-6);
	planeD.rotateX(THREE.Math.degToRad(0));
	planeD.rotateY(THREE.Math.degToRad(180));
	planeD.rotateZ(THREE.Math.degToRad(180));
	scene.add( planeD );
}

/*
function refreshViewPanel(){
	planeLeftGeometrie.material = new THREE.MeshBasicMaterial( {map: planeLeft.texture , side: THREE.BackSide});
}

*/
















// cameraTop
let insetWidth, insetHeight;


function onWindowResize() {
	// Camera frustum aspect ratio
	camera.aspect = CubeViewer.offsetWidth / CubeViewer.offsetHeight;
	// After making changes to aspect
	camera.updateProjectionMatrix();
	// Reset size
	renderer.setSize(CubeViewer.offsetWidth, CubeViewer.offsetHeight);


	insetWidth = CubeViewer.offsetWidth / 4;
	insetHeight = CubeViewer.offsetHeight / 4;

	cameraF.aspect = insetWidth, insetHeight;
	cameraF.updateProjectionMatrix();
}

CubeViewer.addEventListener('resize', onWindowResize, false);




function animate() {
	requestAnimationFrame(animate);
	//spotlight.position.set(camera.position.x + 10, camera.position.y + 10, camera.position.z + 10);

	camera.aspect = CubeViewer.offsetWidth / CubeViewer.offsetHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(CubeViewer.offsetWidth,
		CubeViewer.offsetHeight);

	renderer.setViewport(
		0,
		0,
		CubeViewer.offsetWidth,
		CubeViewer.offsetHeight
	);

	renderer.render(scene, camera);

	// cameraFront
	renderFrontView();
}

function renderFrontView(){
	renderer.clearDepth();
	renderer.setScissorTest(true);
	cameraF.updateProjectionMatrix();
	cameraF.aspect = 1;

	renderer.setScissor(
		CubeViewer.offsetWidth - insetWidth - 8,
		54,
		insetWidth,
		insetWidth
	);
	renderer.setViewport(
		CubeViewer.offsetWidth - insetWidth - 8,
		54,
		insetWidth,
		insetWidth
	);

	renderer.render(scene, cameraF);
	renderer.setScissorTest(false);
}

function renderSideViews(){
	renderer.antialias = false;
	console.log("renderSideViews");

	//plane F
	renderer.setRenderTarget(planeFRenderer);
	renderer.render(scene, cameraF);
	renderer.setRenderTarget(null);

	//plane B
	renderer.setRenderTarget(planeBRenderer);
	renderer.render(scene, cameraB);
	renderer.setRenderTarget(null);

	//plane R
	renderer.setRenderTarget(planeRRenderer);
	renderer.render(scene, cameraR);
	renderer.setRenderTarget(null);

	//plane L
	renderer.setRenderTarget(planeLRenderer);
	renderer.render(scene, cameraL);
	renderer.setRenderTarget(null);

	//plane U
	renderer.setRenderTarget(planeURenderer);
	renderer.render(scene, cameraU);
	renderer.setRenderTarget(null);

	//plane D
	renderer.setRenderTarget(planeDRenderer);
	renderer.render(scene, cameraD);
	renderer.setRenderTarget(null);

	renderer.antialias = true;
}










let turnuPrime = document.getElementById("turnuPrime").addEventListener("click", function(){checkIfCubeIsBussy("u'")});
let turnUPrime = document.getElementById("turnUPrime").addEventListener("click", function(){checkIfCubeIsBussy("U'")});
let turnU = document.getElementById("turnU").addEventListener("click", function(){checkIfCubeIsBussy("U")});
let turnu = document.getElementById("turnu").addEventListener("click", function(){checkIfCubeIsBussy("u")});

let turnfPrime = document.getElementById("turnfPrime").addEventListener("click", function(){checkIfCubeIsBussy("f'")});
let turnf = document.getElementById("turnf").addEventListener("click", function(){checkIfCubeIsBussy("f")});

let turnFPrime = document.getElementById("turnFPrime").addEventListener("click", function(){checkIfCubeIsBussy("F'")});
let turnF = document.getElementById("turnF").addEventListener("click", function(){checkIfCubeIsBussy("F")});

let turnlPrime = document.getElementById("turnlPrime").addEventListener("click", function(){checkIfCubeIsBussy("l'")});
let turnLPrime = document.getElementById("turnLPrime").addEventListener("click", function(){checkIfCubeIsBussy("L'")});
let turnM = document.getElementById("turnM").addEventListener("click", function(){checkIfCubeIsBussy("M")});
let turnR = document.getElementById("turnR").addEventListener("click", function(){checkIfCubeIsBussy("R")});
let turnr = document.getElementById("turnr").addEventListener("click", function(){checkIfCubeIsBussy("r")});

let turnSPrime = document.getElementById("turnSPrime").addEventListener("click", function(){checkIfCubeIsBussy("S'")});
let turnEPrime = document.getElementById("turnEPrime").addEventListener("click", function(){checkIfCubeIsBussy("E'")});
let turnE = document.getElementById("turnE").addEventListener("click", function(){checkIfCubeIsBussy("E")});
let turnS = document.getElementById("turnS").addEventListener("click", function(){checkIfCubeIsBussy("S")});

let turnl = document.getElementById("turnl").addEventListener("click", function(){checkIfCubeIsBussy("l")});
let turnL = document.getElementById("turnL").addEventListener("click", function(){checkIfCubeIsBussy("L")});
let turnMPrime = document.getElementById("turnMPrime").addEventListener("click", function(){checkIfCubeIsBussy("M'")});
let turnRPrime = document.getElementById("turnRPrime").addEventListener("click", function(){checkIfCubeIsBussy("R'")});
let turnrPrime = document.getElementById("turnrPrime").addEventListener("click", function(){checkIfCubeIsBussy("r'")});

let turnB = document.getElementById("turnB").addEventListener("click", function(){checkIfCubeIsBussy("B")});
let turnBPrime = document.getElementById("turnBPrime").addEventListener("click", function(){checkIfCubeIsBussy("B'")});

let turnb = document.getElementById("turnb").addEventListener("click", function(){checkIfCubeIsBussy("b")});
let turnbPrime = document.getElementById("turnbPrime").addEventListener("click", function(){checkIfCubeIsBussy("b'")});

let turndPrime = document.getElementById("turndPrime").addEventListener("click", function(){checkIfCubeIsBussy("d'")});
let turnDPrime = document.getElementById("turnDPrime").addEventListener("click", function(){checkIfCubeIsBussy("D'")});
let turnD = document.getElementById("turnD").addEventListener("click", function(){checkIfCubeIsBussy("D")});
let turnd = document.getElementById("turnd").addEventListener("click", function(){checkIfCubeIsBussy("d")});

let turnx = document.getElementById("turnx").addEventListener("click", function(){checkIfCubeIsBussy("x")});
let turny = document.getElementById("turny").addEventListener("click", function(){checkIfCubeIsBussy("y")});
let turnz = document.getElementById("turnz").addEventListener("click", function(){checkIfCubeIsBussy("z")});

let turnxPrime = document.getElementById("turnxPrime").addEventListener("click", function(){checkIfCubeIsBussy("x'")});
let turnyPrime = document.getElementById("turnyPrime").addEventListener("click", function(){checkIfCubeIsBussy("y'")});
let turnzPrime = document.getElementById("turnzPrime").addEventListener("click", function(){checkIfCubeIsBussy("z'")});




let algText = document.getElementById('algText');
let doAlg = document.getElementById('doAlg').addEventListener("click", function(){doAlgorithm(algText.value)});
let speedSlider = document.getElementById('animationSpeedRangeSlider');




let algorithmStep = document.getElementById('algorithmStep');

let animationDone = 0;
let animationSpeed = 10;
let animationPieceCount = 0;
let animationAngleStep = 5;

speedSlider.oninput = function() {
	if(this.value == 1){
		animationAngleStep = 1;
	}
	if(this.value == 2){
		animationAngleStep = 2;
	}
	if(this.value == 3){
		animationAngleStep = 3;
	}
	if(this.value == 4){
		animationAngleStep = 5;
	}
	if(this.value == 5){
		animationAngleStep = 6;
	}
	if(this.value == 6){
		animationAngleStep = 9;
	}
	if(this.value == 7){
		animationAngleStep = 10;
	}
	if(this.value == 8){
		animationAngleStep = 15;
	}
}

function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {

	console.log(animationPieceCount);

	if(degreeX != 0){
		const vectorX = new THREE.Vector3(1,0,0);
		animateRotation(object, degreeX, vectorX, "x");
	}
	if(degreeY != 0){
		const vectorY = new THREE.Vector3(0,1,0);
		animateRotation(object, degreeY, vectorY, "y");
	}
	if(degreeZ != 0){
		const vectorZ = new THREE.Vector3(0,0,1);
		animateRotation(object, degreeZ, vectorZ, "z");
	}
 }

 function animateRotation(object, degree, vector, achsis){

	let rotFaceComplete = false;
	let rotPieceComplete = false;

	function ifAnimationComplete(){
		if(rotFaceComplete && rotPieceComplete)
		{
			animationDone = animationDone + 1;
			console.log("Animation Done: " + animationDone);
			console.log("Face Rotation: " + rotFaceComplete);
			console.log("Piece Rotation: " + rotPieceComplete);

			updateMirrorPlanes();


		}else{
			console.log("Animation Not Done");
			console.log("Face Rotation: " + rotFaceComplete);
			console.log("Piece Rotation: " + rotPieceComplete);
		}
	}

	if(degree < 0){
		let i = degree / animationAngleStep;
		var matrix = new THREE.Matrix4();

		function rotatePiece() {
			setTimeout(function() {
				let angleI = THREE.Math.degToRad(-animationAngleStep);
				object.rotateOnWorldAxis(vector, angleI);
				//object.rotateOnAxis(vector, angleI);

			  	i++;
				console.log(i);
			  	if (i < 0) {
					rotatePiece();
			  	}
			  	if(i == 0)
				{
					rotPieceComplete = true;
					ifAnimationComplete();
				}
			}, animationSpeed)
		}
		rotatePiece();
		
		


		let j = degree / animationAngleStep;
		var matrix = new THREE.Matrix4();
		function rotateSide(){
			setTimeout(function() {
				if(achsis == "x"){
					matrix.makeRotationX((Math.PI / 180)*-animationAngleStep);
				}
				if(achsis == "y"){
					matrix.makeRotationY((Math.PI / 180)*-animationAngleStep);
				}
				if(achsis == "z"){
					matrix.makeRotationZ((Math.PI / 180)*-animationAngleStep);
				}

				object.position.applyMatrix4(matrix);
			  j++;
			  if (j < 0) {
				rotateSide();
			  }
			  if(j == 0)
			  {
				  rotFaceComplete = true;
				  ifAnimationComplete();
			  }
			}, animationSpeed)
		}
		rotateSide();
		

	}
	else{

		let i = 0;
		var matrix = new THREE.Matrix4();

		function rotatePiece() {
			setTimeout(function() {
				let angleI = THREE.Math.degToRad(animationAngleStep);
				object.rotateOnWorldAxis(vector, angleI);
				//object.rotateOnAxis(vector, angleI);
			  i++;
			  if (i < degree / animationAngleStep) {
				rotatePiece();
			  }
			  if(i == degree /animationAngleStep)
			  {
				  rotPieceComplete = true;
				  ifAnimationComplete();
			  }
			}, animationSpeed)
		}
		rotatePiece();


		let j = 0;
		var matrix = new THREE.Matrix4();
		function rotateSide(){
			setTimeout(function() {
				if(achsis == "x"){
				matrix.makeRotationX((Math.PI / 180)*animationAngleStep);
				}
				if(achsis == "y"){
					matrix.makeRotationY((Math.PI / 180)*animationAngleStep);
				}
				if(achsis == "z"){
					matrix.makeRotationZ((Math.PI / 180)*animationAngleStep);
				}

				object.position.applyMatrix4(matrix);
			  	j++;
			  	if(j < degree / animationAngleStep) {
					rotateSide();
			  	}
				if(j == degree / animationAngleStep)
				{
					rotFaceComplete = true;
					ifAnimationComplete();
				}
			}, animationSpeed)
		}
		rotateSide();
	}
 }










// SCRAMBLE
let faceArray = ["R", "L", "B", "F", "U", "D"];
let extensionArray = ["'", " "];

function createScramble(length){
	let scramble = [];

	for(let i = 0; i <= length; ++i){
		scramble.push(faceArray[Math.floor(Math.random()*6)] + extensionArray[Math.floor(Math.random()*2)]);
	}

	scramble.push("x");
	scramble.push("x");

	return scramble;
}
console.log(createScramble(18));

let scrambleButton = document.getElementById('scramble-button').addEventListener('click', function(){scrambleCube()});
let scrambleTextbox = document.getElementById('scramble-textview');




let renderButton = document.getElementById('get-solve-button').addEventListener('click', function(){getSolve()});

function scrambleCube(){
	let scramble = createScramble(5);

	//doAlgorithm(scramble);

	scrambleCubeArray(scramble);
	scrambleTextbox.innerText = scramble;

};

// RESET CUBE
let resetButton = document.getElementById('reset-button').addEventListener('click', function(){resetCube()});
function resetCube(){


	let sceneArray = scene.children;
	console.log(scene.children);

	for(let j = 0; j <5; ++j){
		for( let i = 0; i < scene.children.length; ++i){
			if(scene.children[i].name == "cube-piece"){
				scene.remove(scene.children[i]);
			}
		}
	}







	// UNDO TO LOAD CUBE!!!
	//loadCube();







	console.log("Reset Cube");
	scrambleTextbox.innerText = "Scramble";
	algorithmStep.innerText="Algorithm Step";
}





function checkIfCubeIsBussy(face){
		turnFace(face);
}


export function doAlgorithm(algorithmText){

		console.log(algorithmText);
		let algArray = algorithmText.split(" ");
		console.log(algArray);
	
		
		let j = 0;
	
		function doSubsequentCode() {
	
			checkIfCubeIsBussy(algArray[j]);
			j++;
			if (j < algArray.length) {
				testForCondition();
			}
		}
		
		function testForCondition() {
			console.log("animationDone: " + animationDone);
			console.log("animationPieceCount: " + animationPieceCount);
			if (animationDone == animationPieceCount) {
				doSubsequentCode();
			} else {
				setTimeout(testForCondition, 50);
			}
		}
		
		testForCondition();
}

function setAlgorithmText(){
	console.log("algorithm")
}

function showAlgStep(algStep){
	algorithmStep.innerText = algStep;
}





function turnFace(face){

	showAlgStep(face);
	animationDone = 0;
	animationPieceCount= 0;

	let sceneArray = scene.children;
	Cube = [];
	for( let i = 0; i < sceneArray.length; ++i){
		if(sceneArray[i].name == "cube-piece"){
			Cube.push(sceneArray[i]);
		}
	}

	if(face === "FULL"){
		animationPieceCount = 27;
		setCubeType("full");
	}
	if(face === "FL"){
		animationPieceCount = 27;
		setCubeType("fl");
	}
	if(face === "F2L"){
		animationPieceCount = 27;
		setCubeType("f2l");
	}
	if(face === "OLL-PLL"){
		animationPieceCount = 27;
		setCubeType("oll-pll");
	}

	// CUBE ROTATION: x
	if(face === "x"){

		// cubeArray
		turnYSlice(0,"clock");
		turnYSlice(1,"clock");
		turnYSlice(2,"clock");

		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 0, -90, 0);
		}
	}

	if(face === "x'"){

		// cubeArray
		turnYSlice(0,"counterClock");
		turnYSlice(1,"counterClock");
		turnYSlice(2,"counterClock");

		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 0, 90, 0);
		}
	}
	if(face === "x2"){

		// cubeArray
		for(let i = 0; i < 2; i++){
			turnYSlice(0,"clock");
			turnYSlice(1,"clock");
			turnYSlice(2,"clock");
		}

		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 0, -180, 0);
		}
	}
	if(face === "x'2"){

		// cubeArray
		for(let i = 0; i < 2; i++){
			turnYSlice(0,"counterClock");
			turnYSlice(1,"counterClock");
			turnYSlice(2,"counterClock");
		}

		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 0, 180, 0);
		}
	}

	// CUBE ROTATION: y
	if(face === "z"){

		// cubeArray
		turnXSlice(0,"clock");
		turnXSlice(1,"clock");
		turnXSlice(2,"clock");

		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], -90, 0, 0);
		}
	}
	if(face === "z'"){

		// cubeArray
		turnXSlice(0,"counterClock");
		turnXSlice(1,"counterClock");
		turnXSlice(2,"counterClock");
		
		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 90, 0, 0);
		}
	}
	if(face === "z2"){

		// cubeArray
		for(let i = 0; i < 2; i++){
			turnXSlice(0,"clock");
			turnXSlice(1,"clock");
			turnXSlice(2,"clock");
		}

		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], -180, 0, 0);
		}
	}
	if(face === "z'2"){

		// cubeArray
		for(let i = 0; i < 2; i++){
			turnXSlice(0,"counterClock");
			turnXSlice(1,"counterClock");
			turnXSlice(2,"counterClock");
		}

		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 180, 0, 0);
		}
	}

	// CUBE ROTATION: z
	if(face === "y"){

		// cubeArray
		turnZSlice(0,"clock");
		turnZSlice(1,"clock");
		turnZSlice(2,"clock");


		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 0, 0, -90);
		}
	}
	if(face === "y'"){

		// cubeArray
		turnZSlice(0,"counterClock");
		turnZSlice(1,"counterClock");
		turnZSlice(2,"counterClock");
		
		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 0, 0, 90);
		}
	}
	if(face === "y2"){

		// cubeArray
		for(let i = 0; i < 2; i++){
			turnZSlice(0,"clock");
			turnZSlice(1,"clock");
			turnZSlice(2,"clock");
		}

		
		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 0, 0, -180);
		}
	}
	if(face === "y'2"){

		// cubeArray
		for(let i = 0; i < 2; i++){
			turnZSlice(0,"counterClock");
			turnZSlice(1,"counterClock");
			turnZSlice(2,"counterClock");
		}

		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 0, 0, 180);
		}
	}

	// SLICE: M
	if(face === "M"){

		// cubeArray
		turnYSlice(1,"counterClock");

		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  <= 1 && position.y >= -1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 0, 90, 0);
			}
		}
	}
	if(face === "M'"){

		// cubeArray
		turnYSlice(1,"clock");


		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  <= 1 && position.y >= -1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 0, -90, 0);
			}
		}
	}
	if(face === "M2"){

		// cubeArray
		for(let i = 0; i < 2; i++){
			turnYSlice(1,"counterClock");
		}

		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  <= 1 && position.y >= -1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 0, 180, 0);
			}
		}
	}
	if(face === "M'2"){

		// cubeArray
		for(let i = 0; i < 2; i++){
			turnYSlice(1,"clock");
		}
		
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  <= 1 && position.y >= -1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 0, -180, 0);
			}
		}
	}

	
	// SLICE: E
	if(face === "E"){

		// cubeArray
		turnZSlice(1, "counterClock");

		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  <= 1 && position.z >= -1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 0, 0, 90);
			}
		}
	}
	if(face === "E'"){

		// cubeArray
		turnZSlice(1, "clock");

		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  <= 1 && position.z >= -1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 0, 0, -90);
			}
		}
	}
	if(face === "E2"){

		// cubeArray
		for(let i = 0; i < 2; ++i){
			turnZSlice(1, "counterClock");
		}

		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  <= 1 && position.z >= -1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 0, 0, 180);
			}
		}
	}
	if(face === "E'2"){

		// cubeArray
		for(let i = 0; i < 2; ++i){
			turnZSlice(1, "clock");
		}
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  <= 1 && position.z >= -1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 0, 0, -180);
			}
		}
	}

	// SLICE: S
	if(face === "S"){

		// cubeArray
		turnXSlice(1, "clock");


		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  <= 1 && position.x >= -1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], -90, 0, 0);
			}
		}
	}
	if(face === "S'"){

		// cubeArray
		turnXSlice(1, "counterClock");

		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  <= 1 && position.x >= -1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 90, 0, 0);
			}
		}
	}
	if(face === "S2"){

		// cubeArray
		for(let i = 0; i < 2; i++){
			turnXSlice(1, "clock");
		}

		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  <= 1 && position.x >= -1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], -180, 0, 0);
			}
		}
	}
	if(face === "S'2"){

		// cubeArray
		for(let i = 0; i < 2; i++){
			turnXSlice(1, "counterClock");
		}

		
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  <= 1 && position.x >= -1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 180, 0, 0);
			}
		}
	}

	// FACE: D
	if(face === "D"){

		// cubeArray
		turnZSlice(0, "counterClock");

		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  < -1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 0, 0, 90);
			}
		}
	}
	if(face === "D'"){

		// cubeArray
		turnZSlice(0, "clock");

		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  < -1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 0, 0, -90);
			}
		}
	}
	if(face === "D2"){

		// cubeArray
		for(let i = 0; i < 2; ++i){
			turnZSlice(0, "counterClock");
		}

		
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  < -1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 0, 0, 180);
			}
		}
	}
	if(face === "D'2"){

		// cubeArray
		for(let i = 0; i < 2; ++i){
			turnZSlice(0, "clock");
		}
		
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  < -1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 0, 0, -180);
			}
		}
	}
	if(face === "d"){

		// cubeArray
		turnZSlice(0, "counterClock");
		turnZSlice(1, "counterClock");

		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  < 1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 0, 0, 90);
			}
		}
	}
	if(face === "d'"){

		// cubeArray
		turnZSlice(0, "clock");
		turnZSlice(1, "clock");
		
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  < 1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 0, 0, -90);
			}
		}
	}
	if(face === "d2"){

		// cubeArray
		for(let i = 0; i <2; ++i){
			turnZSlice(0, "counterClock");
			turnZSlice(1, "counterClock");
		}


		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  < 1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 0, 0, 180);
			}
		}
	}
	if(face === "d'2"){

		// cubeArray
		for(let i = 0; i <2; ++i){
			turnZSlice(0, "clock");
			turnZSlice(1, "clock");
		}
		
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  < 1){
				Cube[i].up.set(0,0,1); 
				rotateObject(Cube[i], 0, 0, -180);
			}
		}
	}



	// FACE: R
	if(face === "R'"){
		turnYSlice(2, "counterClock");
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  > 1){
				rotateObject(Cube[i], 0, 90, 0);
			}
		}
	}
	if(face === "R"){
		turnYSlice(2, "clock");

		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  > 1){
				rotateObject(Cube[i], 0, -90, 0);
			}
		}
	}
	if(face === "R2"){
		for(let i = 0; i <2; ++i){
			turnYSlice(2, "clock");
		}
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  > 1){
				rotateObject(Cube[i], 0, -180, 0);
			}
		}
	}
	if(face === "R'2"){
		for(let i = 0; i <2; ++i){
			turnYSlice(2, "counterClock");
		}
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  > 1){
				rotateObject(Cube[i], 0, 180, 0);
			}
		}
	}
	if(face === "r'"){

		turnYSlice(2, "counterClock");
		turnYSlice(1, "counterClock");
		


		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  > -1){
				rotateObject(Cube[i], 0, 90, 0);
			}
		}
	}
	if(face === "r"){

		turnYSlice(2, "clock");
		turnYSlice(1, "clock");

		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  > -1){
				rotateObject(Cube[i], 0, -90, 0);
			}
		}
	}
	if(face === "r2"){
		for( let i = 0; i < 2; i++){
			turnYSlice(2, "clock");
			turnYSlice(1, "clock");
		}
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  > -1){
				rotateObject(Cube[i], 0, -180, 0);
			}
		}
	}
	if(face === "r'2"){
		for( let i = 0; i < 2; i++){
			turnYSlice(2, "counterClock");
			turnYSlice(1, "counterClock");
		}
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  > -1){
				rotateObject(Cube[i], 0, 180, 0);
			}
		}
	}




	// FACE: L
	if(face === "l'"){
		turnYSlice(0, "clock");
		turnYSlice(1, "clock");
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  < 1){
				rotateObject(Cube[i], 0, -90, 0);
			}
		}
	}
	if(face === "l"){
		turnYSlice(0, "counterClock");
		turnYSlice(1, "counterClock");
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  < 1){
				rotateObject(Cube[i], 0, 90, 0);
			}
		}
	}
	if(face === "l2"){
		for(let i = 0; i < 2; ++i){
			turnYSlice(0, "counterClock");
			turnYSlice(1, "counterClock");
		}
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  < 1){
				rotateObject(Cube[i], 0, 180, 0);
			}
		}
	}
	if(face === "l'2"){
		for(let i = 0; i < 2; ++i){
			turnYSlice(0, "clock");
			turnYSlice(1, "clock");
		}
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  < 1){
				rotateObject(Cube[i], 0, -180, 0);
			}
		}
	}
	if(face === "L'"){
		turnYSlice(0, "clock");
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  < -1){
				rotateObject(Cube[i], 0, -90, 0);
			}
		}
	}
	if(face === "L"){
		turnYSlice(0, "counterClock");
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  < -1){
				rotateObject(Cube[i], 0, 90, 0);
			}
		}
	}
	if(face === "L2"){
		for(let i = 0; i <2; ++i){
			turnYSlice(0, "counterClock");
		}
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  < -1){
				rotateObject(Cube[i], 0, 180, 0);
			}
		}
	}
	if(face === "L'2"){
		for(let i = 0; i <2; ++i){
			turnYSlice(0, "clock");
		}
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  < -1){
				rotateObject(Cube[i], 0, -180, 0);
			}
		}
	}



	// FACE: U
	if(face === "U'"){
		turnZSlice(2, "counterClock");
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  > 1){
				rotateObject(Cube[i], 0, 0, 90);
			}
		}
	}
	if(face === "U"){
		turnZSlice(2, "clock");
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  > 1){
				rotateObject(Cube[i], 0, 0, -90);
			}
		}
	}
	if(face === "U2"){
		for(let i = 0; i < 2; ++i){
			turnZSlice(2, "counterClock");
		}

		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  > 1){
				rotateObject(Cube[i], 0, 0, -180);
			}
		}
	}
	if(face === "U'2"){
		for(let i = 0; i < 2; ++i){
			turnZSlice(2, "clock");
		}

		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  > 1){
				rotateObject(Cube[i], 0, 0, 180);
			}
		}
	}
	if(face === "u'"){
		turnZSlice(2, "counterClock");
		turnZSlice(1, "counterClock");

		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  > -1){
				rotateObject(Cube[i], 0, 0, 90);
			}
		}
	}
	if(face === "u"){
		turnZSlice(2, "clock");
		turnZSlice(1, "clock");
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  > -1){
				rotateObject(Cube[i], 0, 0, -90);
			}
		}
	}
	if(face === "u2"){
		for(let i = 0; i < 2; ++i){
			turnZSlice(2, "counterClock");
			turnZSlice(1, "counterClock");
		}
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  > -1){
				rotateObject(Cube[i], 0, 0, -180);
			}
		}
	}
	if(face === "u'2"){
		for(let i = 0; i < 2; ++i){
			turnZSlice(2, "counterClock");
			turnZSlice(1, "counterClock");
		}
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  > -1){
				rotateObject(Cube[i], 0, 0, 180);
			}
		}
	}

	// FACE: F
	if(face === "F'"){
		turnXSlice(2, "counterClock");
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  > 1){
				rotateObject(Cube[i], 90, 0, 0);
			}
		}
	}
	if(face === "F"){
		turnXSlice(2, "clock");

		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  > 1){
				rotateObject(Cube[i], -90, 0, 0);
			}
		}
	}
	if(face === "F2"){
		for(let i = 0; i < 2; ++i){
			turnXSlice(2, "clock");
		}
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  > 1){
				rotateObject(Cube[i], -180, 0, 0);
			}
		}
	}
	if(face === "F'2"){
		for(let i = 0; i < 2; ++i){
			turnXSlice(2, "clock");
		}
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  > 1){
				rotateObject(Cube[i], 180, 0, 0);
			}
		}
	}
	if(face === "f'"){
		turnXSlice(2, "counterClock");
		turnXSlice(1, "counterClock");

		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  > -1){
				rotateObject(Cube[i], 90, 0, 0);
			}
		}
	}
	if(face === "f"){
		turnXSlice(2, "clock");
		turnXSlice(1, "clock");
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  > -1){
				rotateObject(Cube[i], -90, 0, 0);
			}
		}
	}
	if(face === "f2"){
		for(let i = 0; i<2; ++i){
			turnXSlice(2, "clock");
			turnXSlice(1, "clock");
		}
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  > -1){
				rotateObject(Cube[i], -180, 0, 0);
			}
		}
	}
	if(face === "f'2"){
		for(let i = 0; i<2; ++i){
			turnXSlice(2, "clock");
			turnXSlice(1, "clock");
		}
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  > -1){
				rotateObject(Cube[i], 180, 0, 0);
			}
		}
	}



	// FACE: B
	if(face === "B'"){
		turnXSlice(0, "clock");
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  < -1){
				rotateObject(Cube[i], -90, 0, 0);
			}
		}
	}
	if(face === "B"){
		turnXSlice(0, "counterClock");
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  < -1){
				rotateObject(Cube[i], 90, 0, 0);
			}
		}
	}
	if(face === "B2"){
		for(let i = 0; i<2; ++i){
			turnXSlice(0, "clock");
		}
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  < -1){
				rotateObject(Cube[i], 180, 0, 0);
			}
		}
	}
	if(face === "B'2"){
		for(let i = 0; i<2; ++i){
			turnXSlice(0, "clock");
		}
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  < -1){
				rotateObject(Cube[i], -180, 0, 0);
			}
		}
	}
	if(face === "b'"){
		turnXSlice(0, "clock");
		turnXSlice(1, "clock");


		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  < 1){
				rotateObject(Cube[i], -90, 0, 0);
			}
		}
	}
	if(face === "b"){
		turnXSlice(0, "counterClock");
		turnXSlice(1, "counterClock");
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  < 1){
				rotateObject(Cube[i], 90, 0, 0);
			}
		}
	}
	if(face === "b2"){
		for(let i = 0; i <2; ++i){
			turnXSlice(0, "counterClock");
			turnXSlice(1, "counterClock");
		}
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  < 1){
				rotateObject(Cube[i], 180, 0, 0);
			}
		}
	}
	if(face === "b'2"){
		for(let i = 0; i <2; ++i){
			turnXSlice(0, "counterClock");
			turnXSlice(1, "counterClock");
		}
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  < 1){
				rotateObject(Cube[i], -180, 0, 0);
			}
		}
	}





	if(face === "(" || face == ")"){
		animationPieceCount = 0;
		animationDone = 0;
	}
}



init();
onWindowResize();
animate();



























