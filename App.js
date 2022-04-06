import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import Explore from './pages/explore/Explore';
import ExploreDrinks from './pages/explore/ExploreDrinks';
import ExploreDrinksIngredients from './pages/explore/ExploreDrinksIngredients';
import ExploreFoods from './pages/explore/ExploreFoods';
import ExploreFoodsIngredients from './pages/explore/ExploreFoodsIngredients';
import ExploreFoodsNationalities from './pages/explore/ExploreFoodsNationalities';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodRecipe from './pages/recipes/FoodRecipe';
import DrinkRecipe from './pages/recipes/DrinkRecipe';
import ProgFoodRecipe from './pages/recipes/ProgFoodRecipe';
import ProgDrinkRecipe from './pages/recipes/ProgDrinkRecipe';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route
          exact
          path="/foods/:id"
          component={ FoodRecipe }
        />
        <Route exact path="/drinks/:id" component={ DrinkRecipe } />
        <Route path="/foods/:id/in-progress" component={ ProgFoodRecipe } />
        <Route path="/drinks/:id/in-progress" component={ ProgDrinkRecipe } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route path="/explore/foods/ingredients" component={ ExploreFoodsIngredients } />
        <Route
          path="/explore/drinks/ingredients"
          component={ ExploreDrinksIngredients }
        />
        <Route
          path="/explore/foods/nationalities"
          component={ ExploreFoodsNationalities }
        />
        <Route
          path="/explore/drinks/nationalities"
          component={ NotFound }
        />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
