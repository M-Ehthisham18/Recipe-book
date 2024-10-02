const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=pasta`

const fetchRecipe =async (url)=>{
    const fetching =await fetch(`${url}`);
    const recipe =await fetching.json();
    // console.log(recipe.meals[0].strMeal)
    
}
fetchRecipe(url);

const form = document.querySelector('form');
const inputField = form.elements[0];
const submitBtn = form.elements[1];

form.addEventListener('submit',(e)=>{
    e.preventDefault();
})

