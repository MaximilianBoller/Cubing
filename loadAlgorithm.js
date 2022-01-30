import { doAlgorithm } from "./main.js";
import { updateAlgOverlay } from "./loadSVGTest.js";



var infoReq = new XMLHttpRequest(); // New request object

let algorithmArray = [];

infoReq.onload = function() {
    console.log(this.response);

    let jsonObject = JSON.parse(this.response);
    algorithmArray = jsonObject.algorithm;

    console.log(algorithmArray);
    createAlgCard("3x3");
};
infoReq.open("get", "algorithm.json", true);
infoReq.send();







let searchAlgInput = document.getElementById('search-algorithm');
let searchAlgButton = document.getElementById('search-button');
    searchAlgButton.addEventListener('click', function(){
        searchAlgorithm();
    });

    let searchHistory = document.getElementById('last-searched');
let lastSearched = [];

function searchAlgorithm(){

    console.log("----------");
    handleSearchHistory();
    createAlgCard(searchAlgInput.value);


}
function handleSearchHistory(){
    if(lastSearched.length > 4){
        lastSearched.pop();
    }
    lastSearched.unshift(searchAlgInput.value);

    if(searchHistory.innerHTML != null){
        searchHistory.innerHTML = "";
    }

    for(let i = 0; i < lastSearched.length; ++i){
        let categoryChip = document.createElement('div');
        categoryChip.classList.add('category-chip');
        categoryChip.innerText = lastSearched[i];
        categoryChip.addEventListener('click', function(){
            createAlgCard(lastSearched[i]);
        });
        console.log(lastSearched[i]);

        searchHistory.append(categoryChip);
    }
}

let algGrid = document.getElementById('alg-grid');

function createAlgCard(searchValue){
    if(algGrid.innerHTML != null){
        algGrid.innerHTML = "";
    }



    for(let i = 0; i < algorithmArray.length; ++i){

        if(algorithmArray[i].name.includes(searchValue) || algorithmArray[i].category.includes(searchValue)){

            let algCard = document.createElement('div');
        /*
            algCard.addEventListener('click', function(){
                doAlgorithm(algorithmArray[i].scramble);
                console.log(algorithmArray[i].scramble);
            });
*/


            algCard.classList.add('alg-card');

            let infoSection = document.createElement('div');
                infoSection.classList.add('info-section');

                let headerSection = document.createElement('div');
                    headerSection.classList.add('header-section');
                    
                    
                    
                    
                    let algName = document.createElement('div');
                        algName.classList.add('alg-name');
                        algName.innerText = algorithmArray[i].name;

                    let expandButton = document.createElement('img');
                        expandButton.classList.add('expand-button');
                        expandButton.setAttribute('src', "img/button/expand-button.svg")
                
                let categorySection = document.createElement('div');
                    categorySection.classList.add('category-section');

                    for(let j = 0; j < algorithmArray[i].category.length; ++j){
                        let categoryChip = document.createElement('div');
                            categoryChip.classList.add('category-chip');
                            categoryChip.innerText = algorithmArray[i].category[j];
                            categoryChip.addEventListener('click', function(){
                                createAlgCard(algorithmArray[i].category[j]);
                            });
                            categorySection.append(categoryChip);
                    }
                
                let imageSection = document.createElement('div');
                    imageSection.classList.add('image-section');

                    let algImage = document.createElement('img');
                        algImage.classList.add('alg-image');
                        algImage.addEventListener('click', function(){
                            updateAlgOverlay(algorithmArray[i].image);
                        });

                        algImage.setAttribute('src', algorithmArray[i].image);
                    
                    let setupButton = document.createElement('img');
                        setupButton.setAttribute('src', "2x/reset-icon.png");
                        setupButton.classList.add('icon-button');
                        setupButton.addEventListener('click', function(){
                            doAlgorithm(algorithmArray[i].scramble);
                        });

                
                let algSection = document.createElement('div');
                    algSection.classList.add('alg-section');
                for(let j = 0; j < algorithmArray[i].algorithm.length; ++j){

                        let algText = document.createElement('div');
                            algText.classList.add('alg-text');

                        algText.innerText = algorithmArray[i].algorithm[j];
                        algText.classList.add('alg-textfeld');
                        algText.addEventListener('click', function(){
                            doAlgorithm(algorithmArray[i].algorithm[j]);
                        });
                    
                        algSection.append(algText);
                }

            let cubeSection = document.createElement('div');

    

        // APPEND
        algCard.append(infoSection);
        infoSection.append(headerSection, categorySection, imageSection, algSection);
        headerSection.append(algName);
        imageSection.append(algImage, setupButton);

        algGrid.append(algCard);
        }

        
    }
}


