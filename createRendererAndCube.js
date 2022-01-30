function createCubeWithScene(target){

let camera, scene, renderer, controls, spotlight;

var max = 3;
var Cube = new Array();

console.log(Cube);


let CubeViewer = document.getElementById(target);

import {GLTFLoader} from "./GLTFLoader.js";
import {OrbitControls} from "./OrbitControls.js";

function init() {

	// Init scene
	scene = new THREE.Scene();

	// Init camera (PerspectiveCamera)
	camera = new THREE.PerspectiveCamera(
		75,
		CubeViewer.offsetWidth / CubeViewer.offsetHeight,
		0.1,
		1000
	);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(CubeViewer.offsetWidth, CubeViewer.offsetHeight);
	renderer.toneMapping = THREE.ReinhardToneMapping;
	renderer.toneMappingExposure = 2;
	renderer.shadowMap.enable = true;

	CubeViewer.appendChild(renderer.domElement);

	loadCube();
	loadArrow();
	
    var light = new THREE.HemisphereLight(0xffffff, 0xffffff, 3);
    scene.add(light);

	spotlight = new THREE.SpotLight(0xffa95c, 4);
	spotlight.castShadow = true;
	scene.add(spotlight);

	scene.background = new THREE.Color(0xA0A0A0);

	scene.rotateX(THREE.Math.degToRad(-90));
	scene.rotateZ(THREE.Math.degToRad(-90));

	camera.position.z = 10;
	camera.position.y = 5;
	camera.rotation.x = -.5;

	controls = new OrbitControls(camera, renderer.domElement);

	const xAxsis = new THREE.Vector3( 1, 0, 0 );
	const yAxsis = new THREE.Vector3(0,1,0);
	const zAxsis = new THREE.Vector3(0,0,1);
	
	const origin = new THREE.Vector3( 0, 0, 0 );
	const length = 5;

	const red = 0xFD4938;
	const green = 0x69EA4F;
	const blue = 0x3A85F8;

	const xAxisHelper = new THREE.ArrowHelper( xAxsis, origin, length, red );
	const yAxisHelper = new THREE.ArrowHelper( yAxsis, origin, length, green );
	const zAxisHelper = new THREE.ArrowHelper( zAxsis, origin, length, blue );
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






let cubeDir = "./Cube/";
let cubeLayout = "FULL";

let cubeTypeFull = document.getElementById('cube-type-full').addEventListener("click", function(){setCubeType("full")});
let cubeTypeFL = document.getElementById('cube-type-fl').addEventListener("click", function(){setCubeType("fl")});
let cubeTypeF2L = document.getElementById('cube-type-f2l').addEventListener("click", function(){setCubeType("f2l")});
let cubeTypeOLLPLL = document.getElementById('cube-type-oll-pll').addEventListener("click", function(){setCubeType("oll-pll")});

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
						if(number <= 18){
							cubeDir = "./Cube Black/";
						}else{
							cubeDir = "./Cube/";
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
							var positionVector = new THREE.Vector3(reihe *2, spalte*2, layer*2);


							cubePiece.position.copy(positionVector);
							cubePiece.name = "cube-piece";
							
							cubePiece.rotateX(THREE.Math.degToRad(90));
							cubePiece.rotateY(THREE.Math.degToRad(-90));

							cubePiece.castShadow = true;
							cubePiece.receiveShadow = true;
							/*
							cubePiece.rotateY(THREE.Math.degToRad(-90));
							cubePiece.rotateZ(THREE.Math.degToRad(-90));
							*/
							scene.add(cubePiece);
							console.log(pathName + " " + reihe *2+ " " + spalte*2 +" "+ layer*2);


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


function animate() {
	requestAnimationFrame(animate);
	spotlight.position.set(camera.position.x + 10, camera.position.y + 10, camera.position.z + 10);

	renderer.render(scene, camera);
}


function onWindowResize() {
	// Camera frustum aspect ratio
	camera.aspect = CubeViewer.offsetWidth / CubeViewer.offsetHeight;
	// After making changes to aspect
	camera.updateProjectionMatrix();
	// Reset size
	renderer.setSize(CubeViewer.offsetWidth, CubeViewer.offsetHeight);
}

CubeViewer.addEventListener('resize', onWindowResize, false);






init();
animate();






let turnuPrime = document.getElementById("turnuPrime").addEventListener("click", function(){turnFace("u'")});
let turnUPrime = document.getElementById("turnUPrime").addEventListener("click", function(){turnFace("U'")});
let turnU = document.getElementById("turnU").addEventListener("click", function(){turnFace("U")});
let turnu = document.getElementById("turnu").addEventListener("click", function(){turnFace("u")});

let turnfPrime = document.getElementById("turnfPrime").addEventListener("click", function(){turnFace("f'")});
let turnf = document.getElementById("turnf").addEventListener("click", function(){turnFace("f")});

let turnFPrime = document.getElementById("turnFPrime").addEventListener("click", function(){turnFace("F'")});
let turnF = document.getElementById("turnF").addEventListener("click", function(){turnFace("F")});

let turnlPrime = document.getElementById("turnlPrime").addEventListener("click", function(){turnFace("l'")});
let turnLPrime = document.getElementById("turnLPrime").addEventListener("click", function(){turnFace("L'")});
let turnM = document.getElementById("turnM").addEventListener("click", function(){turnFace("M")});
let turnR = document.getElementById("turnR").addEventListener("click", function(){turnFace("R")});
let turnr = document.getElementById("turnr").addEventListener("click", function(){turnFace("r")});

let turnSPrime = document.getElementById("turnSPrime").addEventListener("click", function(){turnFace("S'")});
let turnEPrime = document.getElementById("turnEPrime").addEventListener("click", function(){turnFace("E'")});
let turnE = document.getElementById("turnE").addEventListener("click", function(){turnFace("E")});
let turnS = document.getElementById("turnS").addEventListener("click", function(){turnFace("S")});

let turnl = document.getElementById("turnl").addEventListener("click", function(){turnFace("l")});
let turnL = document.getElementById("turnL").addEventListener("click", function(){turnFace("L")});
let turnMPrime = document.getElementById("turnMPrime").addEventListener("click", function(){turnFace("M'")});
let turnRPrime = document.getElementById("turnRPrime").addEventListener("click", function(){turnFace("R'")});
let turnrPrime = document.getElementById("turnrPrime").addEventListener("click", function(){turnFace("r'")});

let turnB = document.getElementById("turnB").addEventListener("click", function(){turnFace("B")});
let turnBPrime = document.getElementById("turnBPrime").addEventListener("click", function(){turnFace("B'")});

let turnb = document.getElementById("turnb").addEventListener("click", function(){turnFace("b")});
let turnbPrime = document.getElementById("turnbPrime").addEventListener("click", function(){turnFace("b'")});

let turndPrime = document.getElementById("turndPrime").addEventListener("click", function(){turnFace("d'")});
let turnDPrime = document.getElementById("turnDPrime").addEventListener("click", function(){turnFace("D'")});
let turnD = document.getElementById("turnD").addEventListener("click", function(){turnFace("D")});
let turnd = document.getElementById("turnd").addEventListener("click", function(){turnFace("d")});

let turnx = document.getElementById("turnx").addEventListener("click", function(){turnFace("x")});
let turny = document.getElementById("turny").addEventListener("click", function(){turnFace("y")});
let turnz = document.getElementById("turnz").addEventListener("click", function(){turnFace("z")});

let turnxPrime = document.getElementById("turnxPrime").addEventListener("click", function(){turnFace("x'")});
let turnyPrime = document.getElementById("turnyPrime").addEventListener("click", function(){turnFace("y'")});
let turnzPrime = document.getElementById("turnzPrime").addEventListener("click", function(){turnFace("z'")});




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
let extensionArray = ["2", "'", " "];

function createScramble(length){
	let scramble = "";

	for(let i = 0; i <= length; ++i){
		scramble = scramble + " " + faceArray[Math.floor(Math.random()*6)] + extensionArray[Math.floor(Math.random()*2)];
	}
	return scramble;
}
console.log(createScramble(18));

let scrambleButton = document.getElementById('scramble-button').addEventListener('click', function(){scrambleCube()});
let scrambleTextbox = document.getElementById('scramble-textview');

function scrambleCube(){
	let scramble = createScramble(18);

	scrambleTextbox.innerText = scramble;
	doAlgorithm(scramble);

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

	loadCube();
	console.log("Reset Cube");
	scrambleTextbox.innerText = "Scramble";
	algorithmStep.innerText="Algorithm Step";
}














function doAlgorithm(algorithmText){

	console.log(algorithmText);

	let algArray = algorithmText.split(" ");
	console.log(algArray);

	
	let j = 0;

	function doSubsequentCode() {

		turnFace(algArray[j]);
		j++;
		if (j < algArray.length) {
			testForCondition();
		  }
	}
	
	function testForCondition() {
		console.log(animationDone);
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

	// CUBE ROTATION: x
	if(face === "x"){
		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 0, -90, 0);
		}
	}

	if(face === "x'"){
		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 0, 90, 0);
		}
	}
	if(face === "x2"){
		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 0, -180, 0);
		}
	}
	if(face === "x'2"){
		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 0, 180, 0);
		}
	}

	// CUBE ROTATION: y
	if(face === "y"){
		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], -90, 0, 0);
		}
	}
	if(face === "y'"){
		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 90, 0, 0);
		}
	}
	if(face === "y2"){
		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], -180, 0, 0);
		}
	}
	if(face === "y'2"){
		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 180, 0, 0);
		}
	}

	// CUBE ROTATION: z
	if(face === "z"){
		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 0, 0, -90);
		}
	}
	if(face === "z'"){
		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 0, 0, 90);
		}
	}
	if(face === "z2"){
		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 0, 0, -180);
		}
	}
	if(face === "z'2"){
		animationPieceCount = 27;
		for(let i = 0; i< Cube.length; ++i){
			Cube[i].up.set(0,0,1); 
			rotateObject(Cube[i], 0, 0, 180);
		}
	}

	// SLICE: M
	if(face === "M"){
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
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  > 1){
				rotateObject(Cube[i], 0, 90, 0);
			}
		}
	}
	if(face === "R"){
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  > 1){
				rotateObject(Cube[i], 0, -90, 0);
			}
		}
	}
	if(face === "R2"){
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  > 1){
				rotateObject(Cube[i], 0, -180, 0);
			}
		}
	}
	if(face === "R'2"){
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  > 1){
				rotateObject(Cube[i], 0, 180, 0);
			}
		}
	}
	if(face === "r'"){
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  > -1){
				rotateObject(Cube[i], 0, 90, 0);
			}
		}
	}
	if(face === "r"){
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  > -1){
				rotateObject(Cube[i], 0, -90, 0);
			}
		}
	}
	if(face === "r2"){
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  > -1){
				rotateObject(Cube[i], 0, -180, 0);
			}
		}
	}
	if(face === "r'2"){
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
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  < 1){
				rotateObject(Cube[i], 0, -90, 0);
			}
		}
	}
	if(face === "l"){
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  < 1){
				rotateObject(Cube[i], 0, 90, 0);
			}
		}
	}
	if(face === "l2"){
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  < 1){
				rotateObject(Cube[i], 0, 180, 0);
			}
		}
	}
	if(face === "l'2"){
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  < 1){
				rotateObject(Cube[i], 0, -180, 0);
			}
		}
	}
	if(face === "L'"){
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  < -1){
				rotateObject(Cube[i], 0, -90, 0);
			}
		}
	}
	if(face === "L"){
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  < -1){
				rotateObject(Cube[i], 0, 90, 0);
			}
		}
	}
	if(face === "L2"){
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.y  < -1){
				rotateObject(Cube[i], 0, 180, 0);
			}
		}
	}
	if(face === "L'2"){
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
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  > 1){
				rotateObject(Cube[i], 0, 0, 90);
			}
		}
	}
	if(face === "U"){
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  > 1){
				rotateObject(Cube[i], 0, 0, -90);
			}
		}
	}
	if(face === "U2"){
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  > 1){
				rotateObject(Cube[i], 0, 0, -180);
			}
		}
	}
	if(face === "U'2"){
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  > 1){
				rotateObject(Cube[i], 0, 0, 180);
			}
		}
	}
	if(face === "u'"){
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  > -1){
				rotateObject(Cube[i], 0, 0, 90);
			}
		}
	}
	if(face === "u"){
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  > -1){
				rotateObject(Cube[i], 0, 0, -90);
			}
		}
	}
	if(face === "u2"){
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.z  > -1){
				rotateObject(Cube[i], 0, 0, -180);
			}
		}
	}
	if(face === "u'2"){
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
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  > 1){
				rotateObject(Cube[i], 90, 0, 0);
			}
		}
	}
	if(face === "F"){
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  > 1){
				rotateObject(Cube[i], -90, 0, 0);
			}
		}
	}
	if(face === "F2"){
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  > 1){
				rotateObject(Cube[i], -180, 0, 0);
			}
		}
	}
	if(face === "F'2"){
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  > 1){
				rotateObject(Cube[i], 180, 0, 0);
			}
		}
	}
	if(face === "f'"){
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  > -1){
				rotateObject(Cube[i], 90, 0, 0);
			}
		}
	}
	if(face === "f"){
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  > -1){
				rotateObject(Cube[i], -90, 0, 0);
			}
		}
	}
	if(face === "f2"){
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  > -1){
				rotateObject(Cube[i], -180, 0, 0);
			}
		}
	}
	if(face === "f'2"){
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
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  < -1){
				rotateObject(Cube[i], -90, 0, 0);
			}
		}
	}
	if(face === "B"){
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  < -1){
				rotateObject(Cube[i], 90, 0, 0);
			}
		}
	}
	if(face === "B2"){
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  < -1){
				rotateObject(Cube[i], 180, 0, 0);
			}
		}
	}
	if(face === "B'2"){
		animationPieceCount = 9;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  < -1){
				rotateObject(Cube[i], -180, 0, 0);
			}
		}
	}
	if(face === "b'"){
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  < 1){
				rotateObject(Cube[i], -90, 0, 0);
			}
		}
	}
	if(face === "b"){
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  < 1){
				rotateObject(Cube[i], 90, 0, 0);
			}
		}
	}
	if(face === "b2"){
		animationPieceCount = 18;
		for(let i = 0; i< Cube.length; ++i){
			let position = Cube[i].position;
			if(position.x  < 1){
				rotateObject(Cube[i], 180, 0, 0);
			}
		}
	}
	if(face === "b'2"){
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




}























