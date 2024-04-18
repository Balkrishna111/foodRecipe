const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const mainContainer = document.getElementById("main-container");
const showHideButton = document.getElementById("show-hide-btn");
const cutBtn = document.getElementById("cut-btn");
const instructionPopUp = document.getElementById("instruction-container");
const instructionPara = document.getElementById("instruction-para");

// console.log(instructionPara)




// showHideButton.addEventListener('click', ()=>{
//     instructionPopUp.style.display = "block";
// })
// cutBtn.addEventListener('click', ()=>{
//     instructionPopUp.style.display = "none";
// })



const infoContainer = document.getElementById("info-container");
const searchBtn = document.getElementById("search-btn");

let ingredientsContainer = [];
let measureContainer = [];

let state = false;
let instructionState = false;

searchBtn.addEventListener("click", ()=>{

    let userInput = document.getElementById("inp-box").value;
    state = true;

    state ? showHideButton.style.display = "block" : showHideButton.style.display = "none";

    const getAPI = async ()=>{
    const request = await fetch(`${url}${userInput}`);
    const response = await request.json();
    console.log(response)
    const myMeal = response.meals[0];
    try {

        for(i in myMeal){
            if(i.startsWith('strIngredient') && myMeal[i] != null && myMeal[i] != ""){
                ingredientsContainer.push(myMeal[i]);
            }
        }
        for(i in myMeal){
            if(i.startsWith('strMeasure') && myMeal[i] != null && myMeal[i] != ""){
                measureContainer.push(myMeal[i]);
            }
        }

        function instructionStateHandler(){
            instructionState ? mainContainer.style.display = "none" : mainContainer.style.display = "block";
        }

        showHideButton.addEventListener('click', ()=>{
            instructionPopUp.style.display = "block";
            instructionPara.innerText = `${myMeal.strInstructions}`;
            instructionState = true;
            instructionStateHandler();
        })
        cutBtn.addEventListener('click', ()=>{
            instructionPopUp.style.display = "none";
            instructionState = false;
            instructionStateHandler();
        })

        console.log(ingredientsContainer)
        console.log(measureContainer)

        

        // search button click was here 
        


           

            infoContainer.innerHTML = `
            
            <div class="heading">
            <img src=${myMeal.strMealThumb} alt="food-pic">
            <div class="food-name-container">
                <h1>${myMeal.strMeal}</h1>
                <h3>${myMeal.strArea}</h3>
            </div>
        </div>
        <div class="ingredients">
            <ul id="ul">
            </ul>
        </div>
        
            `
            let ul = document.getElementById("ul");

            for (let i = 0; i < ingredientsContainer.length; i++) {
                let listItem = document.createElement("li");
                listItem.innerText = `${ingredientsContainer[i]} - ${measureContainer[i]}`;
                ul.appendChild(listItem);
                // console.log(listItem)
                // console.log("hello")
            }




        
        
        
    } catch (error) {
        console.log(error);
    }
}
getAPI();
})










