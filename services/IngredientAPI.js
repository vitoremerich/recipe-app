const MAX_LENGTH = 12;

export async function ingredientFoodAPI(ingredient) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const result = await response.json();
  if (result.meals !== null) {
    const meals = result.meals.slice(0, MAX_LENGTH);
    return meals;
  }
  return result.meals;
}

export async function ingredientCocktailAPI(ingredient) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const result = await response.json();
  if (result.drinks !== null) {
    const drinks = result.drinks.slice(0, MAX_LENGTH);
    return drinks;
  }
  return result.drinks;
}
