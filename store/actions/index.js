export const RESPONSE_API = 'RESPONSE_API';
export const RECIPE_FOODS_ON_LOAD = 'RECIPE_FOODS_ON_LOAD';
export const RECIPE_DRINKS_ON_LOAD = 'RECIPE_DRINKS_ON_LOAD';
export const FILTERED_RECIPES = 'FILTERED_RECIPES';
export const INGREDIENTS_FILTER = 'INGREDIENTS_FILTER';

export const responseAPI = (payload) => (
  {
    type: RESPONSE_API,
    payload,
  }
);

export const recipeFoodsOnLoad = (payload) => (
  {
    type: RECIPE_FOODS_ON_LOAD,
    payload,
  }
);

export const recipeDrinksOnLoad = (payload) => (
  {
    type: RECIPE_DRINKS_ON_LOAD,
    payload,
  }
);

export const recipesFiltered = (payload) => (
  {
    type: FILTERED_RECIPES,
    payload,
  }
);

export const ingredientsFiltered = (payload) => (
  {
    type: INGREDIENTS_FILTER,
    payload,
  }
);
