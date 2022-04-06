const MAX_LENGTH = 12;
export async function nationApi() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const result = await response.json();
  return result.meals;
}

export async function filterCountrie(countrie) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${countrie}`);
  const result = await response.json();
  if (result) {
    const meals = result.meals.slice(0, MAX_LENGTH);
    return meals;
  }
}
