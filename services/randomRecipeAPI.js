export async function randomFood() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const result = await response.json();
  return result.meals;
}

export async function randomDrink() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const result = await response.json();
  return result.drinks;
}
