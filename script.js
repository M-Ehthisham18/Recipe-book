const form = document.querySelector('form');
const inputField = form.elements[0];
const submitBtn = form.elements[1];
const recipeContainer = document.querySelector('.recipeContainer');
const card = document.querySelector('.card');
const fetchRecipe =async (url)=>{
    const fetching =await fetch(`${url}`);
    const response =await fetching.json();
    recipeContainer.innerHTML='';
    for (let i = 0; i < 5; i++) {
        recipe = response.meals[i];
        console.log(recipe.strMeal);
        allRecipies(recipe)
        
    }
}
function allRecipies(recipe) {
    recipeContainer.innerHTML+=`
        <div class="card" onclick="details()">
            <img src="${recipe.strMealThumb}" alt="Avatar" >
                <div class="container">
                    <h4><b>${recipe.strMeal}</b></h4> 
                    <p>${recipe.strArea}</p> 
                    
                </div>
        </div> 
    `
}

function details() {
    recipeContainer.innerHTML = `
        <div class="recipeDescription">
        <i class="fas fa-times" onclick="allRecipies(recipe)"></i>

            <div class="imgAndTitle">
                <img src="${recipe.strMealThumb}" alt="Avatar">
                <hr>
                <div class="title">
                    <h4><b>${recipe.strMeal}</b></h4> 
                    <p>${recipe.strArea}</p>
                </div>
            </div>
            <div class="ingrediantes">
                <h2>Ingredients:~</h2>
                <ul id="ingredientsList">
                    <!-- Ingredients will be appended here -->
                </ul>
            </div>
        </div>
    `;
    let ul =document.querySelector('#ingredientsList');

    for (let i = 1; i <= 21; i++) {
        let ingredient = recipe[`strIngredient${i}`];
        let measure = recipe[`strMeasure${i}`];

        if(ingredient.trim() && measure.trim()){
            let li = document.createElement('li');
            li.textContent =`${ingredient.trim()} (${measure})`;
            ul.appendChild(li)
        }
        
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(!inputField.value){
        alert(`Search your Recipe !`)
    }
    else{
        const mealRecipe= inputField.value;
        inputField.value= '';
        recipeContainer.innerHTML=` loading recipe ....`
        fetchRecipe(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealRecipe}`);
    }
})



