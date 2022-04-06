const MAX_LENGTH_CATEGORY = 5;
const MAX_LENGTH_RECIPES = 12;

export async function categoryFoodAPI() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const result = await response.json();
  const meals = result.meals.slice(0, MAX_LENGTH_CATEGORY);
  return meals;
}

export async function categoryCocktailAPI() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const result = await response.json();
  const drinks = result.drinks.slice(0, MAX_LENGTH_CATEGORY);
  return drinks;
}

export async function recipesOfFoodsByCategory(category) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
  );
  const result = await response.json();
  const meals = result.meals.slice(0, MAX_LENGTH_RECIPES);
  return meals;
}

export async function recipesOfCocktailsByCategory(category) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
  );
  const result = await response.json();
  const drinks = result.drinks.slice(0, MAX_LENGTH_RECIPES);
  return drinks;
}
