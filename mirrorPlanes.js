import {cubeArray} from "./cubeArray.js";
import { scene } from "./main.js";












let array;

let cubeFaces = [];
let keyArray = ['U', 'D', 'F', 'R', 'B', 'L'];

function init(){
    array = cubeArray;

    // create 2d Arrays for each side of cube. 
    // Put 2d Arrays in asoc array with face name as index.
    for(let i = 0; i < 6; ++i){
        let faceArray = new Array(3);
        for (var j = 0; j < faceArray.length; j++) {
            faceArray[j] = new Array(3);
        }
        cubeFaces[keyArray[i]] = faceArray;
        //console.log("faceArray:");
        //console.log(faceArray);
    }
    //console.log("cubeFaces:");
    //console.log(cubeFaces);

    //console.log("array:");
    //console.log(array);

}

function fillArray(index){
    for (let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++){
            for(let k = 0; k < 3; k++){
                for(let n = 0; n < 3; n++){
                    if(array[i][j][k].vector[n] != undefined){

                        //correct orientation
                        if(index == "U"){
                            if(array[i][j][k].vector[n].vector.z == 1){
                                cubeFaces['U'][j][k] = array[i][j][k].vector[n].color.toString(16);
                            }
                        }

                        //correct orientation
                        if(index == "D"){
                            if(array[i][j][k].vector[n].vector.z == -1){
                                let jIndex = Math.abs(j - 2);
                                cubeFaces['D'][jIndex][k] = array[i][j][k].vector[n].color.toString(16);
                            }
                        }


                        //correct orientation
                        if(index == "R"){
                            if(array[i][j][k].vector[n].vector.y == 1){
                                let iIndex = Math.abs(i - 2);
                                let jIndex = Math.abs(j - 2);
                                cubeFaces['R'][iIndex][jIndex] = array[i][j][k].vector[n].color.toString(16);
                            }
                        }

                        //correct orientation
                        if(index == "L"){
                            if(array[i][j][k].vector[n].vector.y == -1){
                                let iIndex = Math.abs(i - 2);
                                cubeFaces['L'][iIndex][j] = array[i][j][k].vector[n].color.toString(16);
                            }
                        }

                        //correct orientation
                        if(index == "F"){
                            if(array[i][j][k].vector[n].vector.x == 1){
                                let iIndex = Math.abs(i - 2);
                                cubeFaces['F'][iIndex][k] = array[i][j][k].vector[n].color.toString(16);
                            }
                        }

                        //correct orientation
                        if(index == "B"){
                            if(array[i][j][k].vector[n].vector.x == -1){
                                let kIndex = Math.abs(k - 2);
                                let iIndex = Math.abs(i - 2);
                                cubeFaces['B'][iIndex][kIndex] = array[i][j][k].vector[n].color.toString(16);
                            }
                        }

                    }
                }
            }
        }
    }
    //console.log("cubeFaces: ");
    //console.log(cubeFaces);
}



class planeGroup{
    constructor(){
        this.group = new THREE.Group();
        this.createPlane();
    }
    createPlane(){
        for (let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++){
                const geometry = new THREE.PlaneGeometry( 1.7, 1.7);
                const material = new THREE.MeshBasicMaterial( {color: 0x000000, side:THREE.BackSide} );

                const plane = new THREE.Mesh( geometry, material );
                plane.position.set(i*2-2, j*2-2, 0);
                this.group.add(plane);
            }
        }
    }
    updateColor(colorArray){
        //console.log("Plane U Group Children");

        let meshArray = this.group.children;
        //console.log(meshArray);

        let n = 0;

        for (let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++){
                let stringColor = "0x" + colorArray[i][j];
                this.group.children[n].material.color.setHex(stringColor);
                n = n+1;
            }
        }

    }
}


let planeU;
let planeD;
let planeF;
let planeB;
let planeL;
let planeR;

function createMirrorPlaneGeo(){
    planeU = new planeGroup();
    planeU.group.position.set(0,0,6);
    scene.add(planeU.group);

    planeD = new planeGroup();
    planeD.group.position.set(0,0,-6);
    planeD.group.rotateX(THREE.Math.degToRad(180));
    planeD.group.rotateZ(THREE.Math.degToRad(180));
    scene.add(planeD.group);

    planeF = new planeGroup();
    planeF.group.position.set(6,0,0);
    planeF.group.rotateY(THREE.Math.degToRad(90));
    scene.add(planeF.group);

    planeB = new planeGroup();
    planeB.group.position.set(-6,0,0);
    planeB.group.rotateY(THREE.Math.degToRad(-90));
    planeB.group.rotateZ(THREE.Math.degToRad(180));
    scene.add(planeB.group);

    planeL = new planeGroup();
    planeL.group.position.set(0,-6,0);
    planeL.group.rotateX(THREE.Math.degToRad(90));
    planeL.group.rotateZ(THREE.Math.degToRad(-90));
    scene.add(planeL.group);

    planeR = new planeGroup();
    planeR.group.position.set(0,6,0);
    planeR.group.rotateX(THREE.Math.degToRad(-90));
    planeR.group.rotateZ(THREE.Math.degToRad(90));
    scene.add(planeR.group);

}

function updateMirrorPlaneCol(){
    planeU.updateColor(cubeFaces['U']);
    planeD.updateColor(cubeFaces['D']);
    planeF.updateColor(cubeFaces['F']);
    planeB.updateColor(cubeFaces['B']);
    planeL.updateColor(cubeFaces['L']);
    planeR.updateColor(cubeFaces['R']);

}



let ubutton =document.getElementById('read-U-button').addEventListener('click', function(){
    updateMirrorPlanes();
});

export function updateMirrorPlanes(){
    init();
    fillArray("U");
    fillArray("D");
    fillArray("R");
    fillArray("L");
    fillArray("F");
    fillArray("B");

    updateMirrorPlaneCol();
}


createMirrorPlaneGeo();
updateMirrorPlanes();
