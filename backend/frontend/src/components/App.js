import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import FavoriteThingCreate from './favoriteThings/FavoriteThingCreate';
import FavoriteThingEdit from './favoriteThings/FavoriteThingEdit';
import FavoriteThingDelete from './favoriteThings/FavoriteThingDelete';
import FavoriteThingList from './favoriteThings/FavoriteThingList';
import FavoriteThingShow from './favoriteThings/FavoriteThingShow';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={FavoriteThingList} />
            <Route path="/favorite-things/new" exact component={FavoriteThingCreate} />
            <Route path="/favorite-things/edit/:id" exact component={FavoriteThingEdit} />
            <Route path="/favorite-things/delete/:id" exact component={FavoriteThingDelete} />
            <Route path="/favorite-things/:id" exact component={FavoriteThingShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
