import { cubeArray, turnArray } from "./cubeArray.js";
import {white, yellow, green, blue, red, orange} from "./cubeArray.js";
import { doAlgorithm } from "./main.js";
import {updateMirrorPlanes} from "./mirrorPlanes.js";

console.log("cubeAI.js");


let whiteOr;
let yellowOr;
let blueOr;
let redOr;
let greenOr;
let orangeOr;

function getCubeOrientation(){
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; ++j){
            for(let k = 0; k < 3; ++k){
                if(cubeArray[i][j][k].vector[0].color  == white && cubeArray[i][j][k].name == "piece14"){
                    whiteOr = cubeArray[i][j][k].vector[0].vector;
                }
                if(cubeArray[i][j][k].vector[0].color  == yellow && cubeArray[i][j][k].name == "piece05"){
                    yellowOr = cubeArray[i][j][k].vector[0].vector;
                }
                if(cubeArray[i][j][k].vector[0].color  == blue && cubeArray[i][j][k].name == "piece11"){
                    blueOr = cubeArray[i][j][k].vector[0].vector;
                }
                if(cubeArray[i][j][k].vector[0].color  == red && cubeArray[i][j][k].name == "piece15"){
                    redOr = cubeArray[i][j][k].vector[0].vector;
                }
                if(cubeArray[i][j][k].vector[0].color  == orange && cubeArray[i][j][k].name == "piece13"){
                    orangeOr = cubeArray[i][j][k].vector[0].vector;
                }
                if(cubeArray[i][j][k].vector[0].color  == green && cubeArray[i][j][k].name == "piece17"){
                    greenOr = cubeArray[i][j][k].vector[0].vector;
                }
            }
        }
    }

    console.log("whiteOr");
    console.log(whiteOr);
    
    console.log("yellowOr");
    console.log(yellowOr);
    
    console.log("greenOr");
    console.log(greenOr);
    
    console.log("redOr");
    console.log(redOr);
    
    console.log("orangeOr");
    console.log(orangeOr);
    
    console.log("redOr");
    console.log(redOr);
}
let solve = [];

export function getSolve(){
    console.log("getSolve()");
    console.log(cubeArray);


    //Step 001
    getCubeOrientation();

    //Step 002
    orientWhite();
    getCubeOrientation();
    orientBlue();

    //Step 003
    getCubeOrientation();
    createWhiteCross();



    updateMirrorPlanes();


    console.log(solve);
}

function orientWhite(){
    console.log("Step 002 Orient White");
    switch(whiteOr.x){
        case 1:
            turnArray("x'");
            solve.push("x'");
        case -1:
            turnArray("x");
            solve.push("x");
    }

    switch(whiteOr.y){
        case 1:
            turnArray("z");
            solve.push("z");
        case -1:
            turnArray("z'");
            solve.push("z'");
    }

    switch(whiteOr.z){
        case 1:
            turnArray("x");
            solve.push("x");
            turnArray("x");
            solve.push("x");
    }
}

function orientBlue(){
    console.log("Step 002 Orient Blue");
    switch(blueOr.x){
        case -1:
            turnArray("y");
            solve.push("y");
            turnArray("y");
            solve.push("y");
    }

    switch(blueOr.y){
        case 1:
            turnArray("y");
            solve.push("y");
        case -1:
            turnArray("y'");
            solve.push("y'");
    }
}



function createWhiteCross(){
    console.log("Step 003 Create WHite Cross");

    let crossPieces = ["piece20", "piece22", "piece24", "piece26"];

    for( let i = 0; i < 3; ++i){
        for(let j = 0; j < 3; ++j){

            if(crossPieces.includes(cubeArray[0][i][j].name)){
                console.log(true);
                console.log(cubeArray[0][i][j].name);

                console.log(getOrVecCol(cubeArray[0][i][j].vector, white));
                console.log(cubeArray[0][i][j]);

                let whiteVec = getOrVecCol(cubeArray[0][i][j].vector, white);
                let secCol;


                switch(whiteVec.vector.x){
                    case 1:
                        secCol = getVecColor(cubeArray[0][i][j].vector, new THREE.Vector3(0,0,-1), "z");
                        console.log("secColor: " + secCol);
                        switch(secCol){
                            // correct
                            case blue:
                                turnArrayAlg(["F'", "R", "U", "R'", "F", "F"]);
                            case red:
                                turnArrayAlg(["F'", "R'"]);
                            //
                            case green:
                                turnArrayAlg(["F", "F", "U'", "R", "B'", "R'"]);
                            case orange:
                                turnArrayAlg(["F", "L"]);
                        }

                    case -1:
                        secCol = getVecColor(cubeArray[0][i][j].vector, new THREE.Vector3(0,0,-1), "z");
                        console.log("secColor: " + secCol);
                }

                switch(whiteVec.vector.y){
                    case 1:
                        secCol = getVecColor(cubeArray[0][i][j].vector, new THREE.Vector3(0,0,-1), "z");
                        console.log("secColor: " + secCol);

                    case -1:
                        secCol = getVecColor(cubeArray[0][i][j].vector, new THREE.Vector3(0,0,-1), "z");
                        console.log("secColor: " + secCol);
                }
            }
        }
    }
}

function turnArrayAlg(array){
    for(let i = 0; i < array.length; ++i){
        turnArray(array[i]);
        solve.push(array[i]);
    }
}


function getOrVecCol(array, color){
    for(let i = 0; i < array.length; ++i){
        switch(color){
            case array[i].color:
                return array[i];
        }
    }
}

function getVecColor(array, vector3, compare){

    for(let i = 0; i < array.length; ++i){

        console.log("------------------------------");
        console.log(array[i].vector);
        let flooredVec = floorVec(array[i].vector);
        console.log("flooredVec");

        console.log(flooredVec);
        console.log(vector3);



        switch(compare){
            case "z":
                if(flooredVec.z == vector3.z)
                {
                    console.log(array[i].color);
                    return array[i].color;
                }

            case "x":
                if(flooredVec.x == vector3.x)
                {
                    console.log(array[i].color);
                    return array[i].color;
                }

            case "y":
                if(flooredVec.y == vector3.y)
                {
                    console.log(array[i].color);
                    return array[i].color;
                }
        }

    }
}

function floorVec(vector){
    let flooredVec = new THREE.Vector3(Math.round(vector.x), Math.round(vector.y), Math.round(vector.z));
    return flooredVec;
}


console.log("FLOOOOOORED VEC");
console.log(floorVec(new THREE.Vector3(0.21, 1, 0.06)));

