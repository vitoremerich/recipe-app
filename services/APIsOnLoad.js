const MAX_LENGTH = 12;

export async function foodsAPIOnLoad() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const result = await response.json();
  const meals = result.meals.slice(0, MAX_LENGTH);
  return meals;
}

export async function cocktailsAPIOnLoad() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const result = await response.json();
  const drinks = result.drinks.slice(0, MAX_LENGTH);
  return drinks;
}
