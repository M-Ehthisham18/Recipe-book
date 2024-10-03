const form = document.querySelector('form');
const inputField = form.elements[0];
const recipeContainer = document.querySelector('.recipeContainer');
// const strInstructions = document.querySelector('#strInstructions')
// fetchRecipe(`www.themealdb.com/api/json/v1/1/categories.php`) catagori based 
// Fetching recipes from the API
let xyz ;
const fetchRecipe = async (url) => {
    try {
        const fetching = await fetch(url);
        const response = await fetching.json();
        // console.log(response.meals[0].strYoutube);
        
        // Clear container before displaying new recipes
        recipeContainer.innerHTML = '';
                    if (response.meals) {
                        // Iterate over each recipe
                        response.meals.forEach(recipe => {
                            allRecipies(recipe);
                        });
                    } else {
                        recipeContainer.innerHTML = `<p style="font-size:xx-large;">No recipes found for "${xyz}". Try another search!</p>`;
                    }
    } catch (error) {
        console.error("Error fetching recipes: ", error);
        recipeContainer.innerHTML = `<p style="font-size:xx-large;">Something went wrong. Please try again!</p>`;
    }
};

// Displaying all recipes
function allRecipies(recipe) {
    recipeContainer.innerHTML += `
        <div class="card" onclick='details(${JSON.stringify(recipe)})'>     
            <img src="${recipe.strMealThumb}" alt="Avatar" >
            <div class="container">
                <h4><b>${recipe.strMeal}</b></h4> 
                <p>${recipe.strArea}</p> 
            </div>
        </div> 
    `;
}

// Displaying detailed view of a recipe
function details(recipe) {

    //recipe video
    let url=recipe.strYoutube;
    let part = url.split('=');
    
    recipeContainer.innerHTML = `
        <div class="recipeDescription">
            <i class="fas fa-times" id="closeButton"></i>
            <div class="imgAndTitle">
                <img src="${recipe.strMealThumb}" alt="Avatar">
                <hr>
                <div class="title">
                    <h4><b>${recipe.strMeal}</b></h4> 
                    <p>${recipe.strArea}</p>
                </div>
            </div>
            <div class="ingredients">
                <h2>Ingredients:~</h2>
                <ul id="ingredientsList">
                    <!-- Ingredients will be appended here -->
                </ul>
            </div>
            <div class="instruction" >
                <h2> Instructions :~</h2>
                <ul id="strInstructions">
                <!-- Instructions will be appeded -->
                </ul>
            </div>
            <h2 style="padding:5px 24px"> Learn By Watching Video : </h2>
            <div id="youtubeVideo">
                <iframe width="560" height="315" 
                    src="https://www.youtube.com/embed/${part[1]}" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    `;

    // Appending ingredients to the list
    let ul = document.querySelector('#ingredientsList');
    for (let i = 1; i <= 20; i++) {
        let ingredient = recipe[`strIngredient${i}`];
        let measure = recipe[`strMeasure${i}`];
        if (ingredient.trim()) {
            let li = document.createElement('li');
            li.textContent = `${ingredient} ${(measure) ? (measure) : ''}`.trim();
            ul.appendChild(li);
        }
    }

    // get the set of instructions as paragraph 
    let paragraph = `${recipe.strInstructions}`;    
    //convert into list of array using split function and apply map.
    let steps = paragraph.split('.').map(step => step.trim()).filter(step => step.length > 0);
    let instruction = document.querySelector('#strInstructions');
    for (let i = 0; i < steps.length; i++) {
        let li =document.createElement('li');
        li.textContent = `${steps[i]}.`;
        instruction.appendChild(li)
    }
    
    

    // Add event listener to close button after it's rendered
    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', () => {
        // Fetch all recipes again when the close button is clicked
        showLoader(recipeContainer);
        setTimeout(() => {
            fetchRecipe(`https://www.themealdb.com/api/json/v1/1/search.php?s=${xyz}`);
        }, 300);
    });
}

// Form submission to search for recipes
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!inputField.value) {
        alert(`Please enter a recipe name!`);
    } else {
        xyz='';
        const mealRecipe = inputField.value.trim();
        xyz = mealRecipe;
        inputField.value = '';
        showLoader(recipeContainer);
        setTimeout(() => {
            fetchRecipe(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealRecipe}`);
        }, 1000);
    }
});

function showLoader(container) {
    const loaderHTML = `
        <div class="loader">
            <div class="loaderMiniContainer">
                <div class="barContainer">
                    <span class="bar"></span>
                    <span class="bar bar2"></span>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 101 114"
                    class="svgIcon"
                >
                    <circle
                        stroke-width="7"
                        stroke="black"
                        transform="rotate(36.0692 46.1726 46.1727)"
                        r="29.5497"
                        cy="46.1727"
                        cx="46.1726"
                    ></circle>
                    <line
                        stroke-width="7"
                        stroke="black"
                        y2="111.784"
                        x2="97.7088"
                        y1="67.7837"
                        x1="61.7089"
                    ></line>
                </svg>
            </div>
        </div>
    `;
    
    // Inject the loader HTML into the specified container
    container.innerHTML = loaderHTML;
}

