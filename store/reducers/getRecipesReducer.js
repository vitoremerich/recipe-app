import {
  RESPONSE_API,
  RECIPE_FOODS_ON_LOAD,
  RECIPE_DRINKS_ON_LOAD,
  FILTERED_RECIPES,
  INGREDIENTS_FILTER,
} from '../actions';

const INITIAL_STATE = {
  recipes: [],
  filteredRecipes: [],
  searchFood: false,
  searchDrink: false,
  ingredientsFilter: [],
};

export default function getRecipesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RESPONSE_API:
    return {
      ...state,
      recipes: action.payload,
    };
  case RECIPE_FOODS_ON_LOAD:
    return {
      ...state,
      searchFood: action.payload,
    };
  case RECIPE_DRINKS_ON_LOAD:
    return {
      ...state,
      searchDrink: action.payload,
    };
  case FILTERED_RECIPES:
    return {
      ...state,
      filteredRecipes: action.payload,
    };
  case INGREDIENTS_FILTER:
    return {
      ...state,
      ingredientsFilter: action.payload,
    };
  default:
    return state;
  }
}
