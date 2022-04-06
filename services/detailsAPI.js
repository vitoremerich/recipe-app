export async function detailsFoodFetch(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const result = await response.json();
  return result.meals;
}

export async function detailsDrinkFetch(id) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const result = await response.json();
  return result.drinks;
}
