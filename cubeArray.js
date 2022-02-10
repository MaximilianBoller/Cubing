


let arrayHelperBoolean = true;

import { scene } from "./main.js";
import { updateMirrorPlanes } from "./mirrorPlanes.js";

export var cubeArray = new Array(3);

for (var i = 0; i < cubeArray.length; i++) {
    cubeArray[i] = new Array(3);

    for (var j = 0; j < cubeArray.length; j++) {
        cubeArray[i][j] = new Array(3);
    }
}

    export let yellow = 0xE6E010;
    export let green = 0x7DBB40;
    export let orange = 0xF08115;
    export let blue = 0x4B79BC;
    export let red = 0xE94B3E;
    export let white = 0xFFFFFF;

    class vectorColor{
        constructor(vector,color){
            this.vector = vector;
            this.color = color;
        }
    }
    
    class corner{
        constructor(vector1, vector2, vector3, name){
            this.vector = [];
            this.vector[0] = vector1;
            this.vector[1] = vector2;
            this.vector[2] = vector3;
            this.vector.length = 3;
            this.name = name;
        }
    }
    
    class edge{
        constructor(vector1, vector2, name){
            this.vector = [];
            this.vector[0] = vector1;
            this.vector[1] = vector2;
            this.vector.length = 2;
            this.name = name;
        }
    }
    
    class center{
        constructor(vector1, name){
            this.vector = [];
            this.vector.length = 1;
            this.vector[0] = vector1;
            this.name = name;
        }
    }

   // layer 1
    let piece01 = new corner(new vectorColor(new THREE.Vector3(-1,0,0), blue), new vectorColor(new THREE.Vector3(0,-1,0), orange), new vectorColor(new THREE.Vector3(0,0,-1), yellow), "piece01");
    cubeArray[0][0][0] = piece01;
    let piece02 = new edge(new vectorColor(new THREE.Vector3(-1,0,0), blue), new vectorColor(new THREE.Vector3(0,0,-1), yellow), "piece02");
    cubeArray[0][0][1] = piece02;
    let piece03 = new corner(new vectorColor(new THREE.Vector3(-1,0,0), blue), new vectorColor(new THREE.Vector3(0,1,0), red), new vectorColor(new THREE.Vector3(0,0,-1), yellow), "piece03");
    cubeArray[0][0][2] = piece03;

    let piece04 = new edge(new vectorColor(new THREE.Vector3(0,-1,0), orange), new vectorColor(new THREE.Vector3(0,0,-1), yellow), "piece04");
    cubeArray[0][1][0] = piece04;
    let piece05 = new center(new vectorColor(new THREE.Vector3(0,0,-1), yellow), "piece05");
    cubeArray[0][1][1] = piece05;
    let piece06 = new edge(new vectorColor(new THREE.Vector3(0,1,0), red), new vectorColor(new THREE.Vector3(0,0,-1), yellow), "piece06");
    cubeArray[0][1][2] = piece06;

    let piece07 = new corner(new vectorColor(new THREE.Vector3(1,0,0), green), new vectorColor(new THREE.Vector3(0,-1,0), orange), new vectorColor(new THREE.Vector3(0,0,-1), yellow), "piece07");
    cubeArray[0][2][0] = piece07;
    let piece08 = new edge(new vectorColor(new THREE.Vector3(1,0,0), green), new vectorColor(new THREE.Vector3(0,0,-1), yellow), "piece08");
    cubeArray[0][2][1] = piece08;
    let piece09 = new corner(new vectorColor(new THREE.Vector3(1,0,0), green), new vectorColor(new THREE.Vector3(0,1,0), red), new vectorColor(new THREE.Vector3(0,0,-1), yellow), "piece09");
    cubeArray[0][2][2] = piece09;

    // Layer 2
    let piece10 = new edge(new vectorColor(new THREE.Vector3(0,-1,0), orange), new vectorColor(new THREE.Vector3(-1,0,0), blue), "piece10");
    cubeArray[1][0][0] = piece10;
    let piece11 = new center(new vectorColor(new THREE.Vector3(-1,0,0), blue), "piece11");
    cubeArray[1][0][1] = piece11;
    let piece12 = new edge(new vectorColor(new THREE.Vector3(0,1,0), red), new vectorColor(new THREE.Vector3(-1,0,0), blue), "piece12");
    cubeArray[1][0][2] = piece12;

    let piece13 = new center(new vectorColor(new THREE.Vector3(0,-1,0), orange), "piece13");
    cubeArray[1][1][0] = piece13;
    let piece14 = new center(new vectorColor(new THREE.Vector3(0,0,1), white), "piece14");
    cubeArray[1][1][1] = piece14;
    let piece15 = new center(new vectorColor(new THREE.Vector3(0,1,0), red), "piece15");
    cubeArray[1][1][2] = piece15;

    let piece16 = new edge(new vectorColor(new THREE.Vector3(0,-1,0), orange), new vectorColor(new THREE.Vector3(1,0,0), green), "piece16");
    cubeArray[1][2][0] = piece16;
    let piece17 = new center(new vectorColor(new THREE.Vector3(1,0,0), green), "piece17");
    cubeArray[1][2][1] = piece17;
    let piece18 = new edge(new vectorColor(new THREE.Vector3(0,1,0), red), new vectorColor(new THREE.Vector3(1,0,0), green), "piece18");
    cubeArray[1][2][2] = piece18;

    // layer 3
    let piece19 = new corner(new vectorColor(new THREE.Vector3(-1,0,0), blue), new vectorColor(new THREE.Vector3(0,-1,0), orange), new vectorColor(new THREE.Vector3(0,0,1), white), "piece19");
    cubeArray[2][0][0] = piece19;
    let piece20 = new edge(new vectorColor(new THREE.Vector3(-1,0,0), blue), new vectorColor(new THREE.Vector3(0,0,1), white), "piece20");
    cubeArray[2][0][1] = piece20;
    let piece21 = new corner(new vectorColor(new THREE.Vector3(-1,0,0), blue), new vectorColor(new THREE.Vector3(0,1,0), red), new vectorColor(new THREE.Vector3(0,0,1), white), "piece21");
    cubeArray[2][0][2] = piece21;

    let piece22 = new edge(new vectorColor(new THREE.Vector3(0,-1,0), orange), new vectorColor(new THREE.Vector3(0,0,1), white), "piece22");
    cubeArray[2][1][0] = piece22;
    let piece23 = new center(new vectorColor(new THREE.Vector3(0,0,1), white), "piece23");
    cubeArray[2][1][1] = piece23;
    let piece24 = new edge(new vectorColor(new THREE.Vector3(0,1,0), red), new vectorColor(new THREE.Vector3(0,0,1), white), "piece24");
    cubeArray[2][1][2] = piece24;

    let piece25 = new corner(new vectorColor(new THREE.Vector3(1,0,0), green), new vectorColor(new THREE.Vector3(0,-1,0), orange), new vectorColor(new THREE.Vector3(0,0,1), white), "piece25");
    cubeArray[2][2][0] = piece25;
    let piece26 = new edge(new vectorColor(new THREE.Vector3(1,0,0), green), new vectorColor(new THREE.Vector3(0,0,1), white), "piece26");
    cubeArray[2][2][1] = piece26;
    let piece27 = new corner(new vectorColor(new THREE.Vector3(1,0,0), green), new vectorColor(new THREE.Vector3(0,1,0), red), new vectorColor(new THREE.Vector3(0,0,1), white), "piece27");
    cubeArray[2][2][2] = piece27; 

createAxis();

function createAxis(){
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; ++j){
            for(let k = 0; k < 3; ++k){

                let originNew = new THREE.Vector3(j*2 -2, k*2 -2, i*2 -2);

                //console.log(cubeArray[i][j][k]);

                for(let n = 0; n < 3; ++n){
                    if(cubeArray[i][j][k].vector[n] != undefined){
                        let axis = new THREE.ArrowHelper( cubeArray[i][j][k].vector[n].vector, originNew, 4, cubeArray[i][j][k].vector[n].color);
                        axis.name = "arrayHelper";
                        
                        if(arrayHelperBoolean){
                            scene.add(axis);
                        }

                    }
                }

            }
        }
    }

    //console.log("CUBEARRAY AFTER TURN: ");
    //console.log(cubeArray);
}

function resetArrayHelper(){
    let sceneArray = scene.children;

	for(let j = 0; j <6; ++j){
		for( let i = 0; i < scene.children.length; ++i){
			if(scene.children[i].name == "arrayHelper"){
				scene.remove(scene.children[i]);
			}
		}
	}

    createAxis();
}








let tempArray;

export function turnZSlice(sliceIndex, rotationDirection){

    tempArray = [];

    // get pieces out of Array
    for(let i = 0; i < 3; ++i){
        tempArray.push(cubeArray[sliceIndex][0][i]);
    }
    tempArray.push(cubeArray[sliceIndex][1][2]);
    for(let i = 2; i > -1; --i){
        tempArray.push(cubeArray[sliceIndex][2][i]);
    }
    tempArray.push(cubeArray[sliceIndex][1][0]);

    // shift array
    if(rotationDirection == "clock"){
        tempArray.unshift(tempArray[tempArray.length-1]);
        tempArray.pop();
        tempArray.unshift(tempArray[tempArray.length-1]);
        tempArray.pop();
    }else{
        tempArray.push(tempArray[0]);
        tempArray.shift();
        tempArray.push(tempArray[0]);
        tempArray.shift(); 
    }


    //console.log(tempArray);

    // put pieces back into array
    let tempArrayIndex = 0;

    for(let i = 0; i < 3; ++i){
        cubeArray[sliceIndex][0][i] = tempArray[tempArrayIndex];
        tempArrayIndex = tempArrayIndex + 1;
    }
    cubeArray[sliceIndex][1][2] = tempArray[tempArrayIndex];
    tempArrayIndex = tempArrayIndex + 1;
    for(let i = 2; i > -1; --i){
        cubeArray[sliceIndex][2][i] = tempArray[tempArrayIndex];
        tempArrayIndex = tempArrayIndex + 1;
    }
    cubeArray[sliceIndex][1][0] = tempArray[tempArrayIndex];

    // turn the vector of the colors for the pieces
    for(let j = 0; j < 3; ++j){
        for(let k = 0; k < 3; ++k){
            //console.log(cubeArray[sliceIndex][j][k]);
            for(let n = 0; n < 3; ++n){
                if(cubeArray[sliceIndex][j][k].vector[n] != undefined){
                    var axisVector = new THREE.Vector3( 0, 0, 1 );
                    if(rotationDirection == "clock"){
                        var angle = (Math.PI / 2) * -1;
                    }else{
                        var angle = (Math.PI / 2);
                    }


                    cubeArray[sliceIndex][j][k].vector[n].vector.applyAxisAngle( axisVector, angle );
                }
            }
        }
    }
    resetArrayHelper();
}

export function turnYSlice(sliceIndex, rotationDirection){

    tempArray = [];

    // get pieces out of Array
    for(let i = 0; i < 3; ++i){
        tempArray.push(cubeArray[2][i][sliceIndex]);
    }
    tempArray.push(cubeArray[1][2][sliceIndex]);
    for(let i = 2; i > -1; --i){
        tempArray.push(cubeArray[0][i][sliceIndex]);
    }
    tempArray.push(cubeArray[1][0][sliceIndex]);


    // shift array
    if(rotationDirection == "clock"){
        tempArray.push(tempArray[0]);
        tempArray.shift();
        tempArray.push(tempArray[0]);
        tempArray.shift(); 
    }else{
        tempArray.unshift(tempArray[tempArray.length-1]);
        tempArray.pop();
        tempArray.unshift(tempArray[tempArray.length-1]);
        tempArray.pop();


    }


    //console.log(tempArray);

    // put pieces back into array
    let tempArrayIndex = 0;

    for(let i = 0; i < 3; ++i){
        cubeArray[2][i][sliceIndex] = tempArray[tempArrayIndex];
        tempArrayIndex = tempArrayIndex + 1;
    }
    cubeArray[1][2][sliceIndex] = tempArray[tempArrayIndex];
    tempArrayIndex = tempArrayIndex + 1;
    for(let i = 2; i > -1; --i){
        cubeArray[0][i][sliceIndex] = tempArray[tempArrayIndex];
        tempArrayIndex = tempArrayIndex + 1;
    }
    cubeArray[1][0][sliceIndex] = tempArray[tempArrayIndex];


    // turn the vector of the colors for the pieces
    for(let j = 0; j < 3; ++j){
        for(let k = 0; k < 3; ++k){
            //console.log(cubeArray[j][k][sliceIndex]);
            for(let n = 0; n < 3; ++n){
                if(cubeArray[j][k][sliceIndex].vector[n] != undefined){
                    var axisVector = new THREE.Vector3( 0, 1, 0 );
                    if(rotationDirection == "clock"){
                        var angle = (Math.PI / 2) * -1;
                    }else{
                        var angle = (Math.PI / 2);
                    }


                    cubeArray[j][k][sliceIndex].vector[n].vector.applyAxisAngle( axisVector, angle );
                }
            }
        }
    }
    resetArrayHelper();
}

export function turnXSlice(sliceIndex, rotationDirection){

    tempArray = [];

    // get pieces out of Array
    for(let i = 0; i < 3; ++i){
        tempArray.push(cubeArray[2][sliceIndex][i]);
    }
    tempArray.push(cubeArray[1][sliceIndex][2]);
    for(let i = 2; i > -1; --i){
        tempArray.push(cubeArray[0][sliceIndex][i]);
    }
    tempArray.push(cubeArray[1][sliceIndex][0]);


    // shift array
    if(rotationDirection == "clock"){
        tempArray.unshift(tempArray[tempArray.length-1]);
        tempArray.pop();
        tempArray.unshift(tempArray[tempArray.length-1]);
        tempArray.pop();
    }else{
        tempArray.push(tempArray[0]);
        tempArray.shift();
        tempArray.push(tempArray[0]);
        tempArray.shift(); 
    }


    console.log(tempArray);

    // put pieces back into array
    let tempArrayIndex = 0;

    for(let i = 0; i < 3; ++i){
        cubeArray[2][sliceIndex][i] = tempArray[tempArrayIndex];
        tempArrayIndex = tempArrayIndex + 1;
    }
    cubeArray[1][sliceIndex][2] = tempArray[tempArrayIndex];
    tempArrayIndex = tempArrayIndex + 1;
    for(let i = 2; i > -1; --i){
        cubeArray[0][sliceIndex][i] = tempArray[tempArrayIndex];
        tempArrayIndex = tempArrayIndex + 1;
    }
    cubeArray[1][sliceIndex][0] = tempArray[tempArrayIndex];


    // turn the vector of the colors for the pieces
    for(let j = 0; j < 3; ++j){
        for(let k = 0; k < 3; ++k){
            //console.log(cubeArray[j][sliceIndex][k]);
            for(let n = 0; n < 3; ++n){
                if(cubeArray[j][sliceIndex][k].vector[n] != undefined){
                    var axisVector = new THREE.Vector3( 1, 0, 0 );
                    if(rotationDirection == "clock"){
                        var angle = (Math.PI / 2) * -1;
                    }else{
                        var angle = (Math.PI / 2);
                    }


                    cubeArray[j][sliceIndex][k].vector[n].vector.applyAxisAngle( axisVector, angle );
                }
            }
        }
    }
    resetArrayHelper();
}

export function scrambleCubeArray(arr){
    for(let i = 0; i < arr.length; ++i){
            turnArray(arr[i]);
    }
    updateMirrorPlanes();
}



export function turnArray(face){
    // CUBE ROTATION: x
    if(face === "x"){
        turnYSlice(0,"clock");
        turnYSlice(1,"clock");
        turnYSlice(2,"clock");
    }
    if(face === "x'"){
        turnYSlice(0,"counterClock");
        turnYSlice(1,"counterClock");
        turnYSlice(2,"counterClock");
    }
    // CUBE ROTATION: y
    if(face === "z"){
        turnXSlice(0,"clock");
        turnXSlice(1,"clock");
        turnXSlice(2,"clock");
    }
    if(face === "z'"){
        turnXSlice(0,"counterClock");
        turnXSlice(1,"counterClock");
        turnXSlice(2,"counterClock");
    }
    // CUBE ROTATION: z
    if(face === "y"){
        turnZSlice(0,"clock");
        turnZSlice(1,"clock");
        turnZSlice(2,"clock");
    }
    if(face === "y'"){
        turnZSlice(0,"counterClock");
        turnZSlice(1,"counterClock");
        turnZSlice(2,"counterClock");
    }
    // SLICE: M
    if(face === "M"){
        turnYSlice(1,"counterClock");
    }
    if(face === "M'"){
        turnYSlice(1,"clock");
    }
    // SLICE: E
    if(face === "E"){
        turnZSlice(1, "counterClock");
    }
    if(face === "E'"){
        turnZSlice(1, "clock");
    }
    // SLICE: S
    if(face === "S"){
        turnXSlice(1, "clock");
    }
    if(face === "S'"){
        turnXSlice(1, "counterClock");
    }
    // FACE: D
    if(face === "D"){
        turnZSlice(0, "counterClock");
    }
    if(face === "D'"){
        turnZSlice(0, "clock");
    }
    if(face === "d"){
        turnZSlice(0, "counterClock");
        turnZSlice(1, "counterClock");
    }
    if(face === "d'"){
        turnZSlice(0, "clock");
        turnZSlice(1, "clock");
    }
    // FACE: R
    if(face === "R'"){
        turnYSlice(2, "counterClock");
    }
    if(face === "R"){
        turnYSlice(2, "clock");
    }
    if(face === "r'"){
        turnYSlice(2, "counterClock");
        turnYSlice(1, "counterClock");
    }
    if(face === "r"){
        turnYSlice(2, "clock");
        turnYSlice(1, "clock");
    }
    // FACE: L
    if(face === "l'"){
        turnYSlice(0, "clock");
        turnYSlice(1, "clock");
    }
    if(face === "l"){
        turnYSlice(0, "counterClock");
        turnYSlice(1, "counterClock");
    }
    if(face === "L'"){
        turnYSlice(0, "clock");
    }
    if(face === "L"){
        turnYSlice(0, "counterClock");
    }
    // FACE: U
    if(face === "U'"){
        turnZSlice(2, "counterClock");
    }
    if(face === "U"){
        turnZSlice(2, "clock");
    }
    if(face === "u'"){
        turnZSlice(2, "counterClock");
        turnZSlice(1, "counterClock");
    }
    if(face === "u"){
        turnZSlice(2, "clock");
        turnZSlice(1, "clock");
    }
    // FACE: F
    if(face === "F'"){
        turnXSlice(2, "counterClock");
    }
    if(face === "F"){
        turnXSlice(2, "clock");
    }
    if(face === "f'"){
        turnXSlice(2, "counterClock");
        turnXSlice(1, "counterClock");
    }
    if(face === "f"){
        turnXSlice(2, "clock");
        turnXSlice(1, "clock");
    }
    // FACE: B
    if(face === "B'"){
        turnXSlice(0, "clock");
    }
    if(face === "B"){
        turnXSlice(0, "counterClock");
    }
    if(face === "b'"){
        turnXSlice(0, "clock");
        turnXSlice(1, "clock");
    }
    if(face === "b"){
        turnXSlice(0, "counterClock");
        turnXSlice(1, "counterClock");
    }
}