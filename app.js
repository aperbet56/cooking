// Récupération des différents éléments
const result = document.querySelector("#result");
const form = document.querySelector("form");
const input = document.querySelector("input");

// Création de la variable meals afin de stocker les différents plats
let meals = [];

// Création de la fonction fetchMeals afin de récupérer les données de l'API
async function fetchMeals(search) {
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => (meals = data.meals));

  console.log(meals);
}

// Création de la fonction mealsDisplay qui va permettre l'affichage des recettes
function mealsDisplay() {
  if (meals === null) {
    result.innerHTML = "<h2>Aucun résultat</h2>";
  } else {
    meals.length = 12;
    result.innerHTML = meals
      .map((meal) => {
        let ingredients = [];

        for (i = 1; i < 21; i++) {
          if (meal[`strIngredient${i}`]) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];

            ingredients.push(`<li>${ingredient} : ${measure}</li>`);
          }
        }

        console.log(ingredients);

        return `
        <li class="card">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strArea}</p>
            <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}">
            <ul>${ingredients.join("")}</ul>
        </li>
        `;
      })
      .join("");
  }
}

/* Pour afficher les résultats de recherche uniquement lors de l'input/fin de recherche
input.addEventListener("input", (e) => {
fetchMeals(e.target.value);
}); */

// Pour afficher en temps réel les résultats de recherche :

input.addEventListener("input", (e) => {
  fetchMeals(e.target.value).then(() => mealsDisplay());
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  mealsDisplay();
});
