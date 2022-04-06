const MAX_LENGTH = 12;

export async function exploreFoodIngredients() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const result = await response.json();
  const meals = result.meals.slice(0, MAX_LENGTH);
  return meals;
}

export async function exploreDrinkIngredients() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const result = await response.json();
  const drinks = result.drinks.slice(0, MAX_LENGTH);
  return drinks;
}
