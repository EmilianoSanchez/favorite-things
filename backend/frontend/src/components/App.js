import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import FavoriteThingCreate from './routes/FavoriteThingCreate';
import FavoriteThingEdit from './routes/FavoriteThingEdit';
import FavoriteThingDelete from './routes/FavoriteThingDelete';
import FavoriteThingList from './routes/FavoriteThingList';
import FavoriteThingShow from './routes/FavoriteThingShow';
import FavoriteThingMetadataDelete from './routes/FavoriteThingMetadataDelete';
import FavoriteThingMetadataCreate from './routes/FavoriteThingMetadataCreate';
import AuditLogList from "./routes/AuditLogList";
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
            <Route path="/favorite-things/edit/:favorite_thing_id/metadata/delete/:id" exact component={FavoriteThingMetadataDelete} />
            <Route path="/favorite-things/edit/:favorite_thing_id/metadata/new" exact component={FavoriteThingMetadataCreate} />
            <Route path="/favorite-things/delete/:id" exact component={FavoriteThingDelete} />
            <Route path="/favorite-things/:id" exact component={FavoriteThingShow} />
            {/*<Route path="/favorite-things/new-enum" exact component={FavoriteThingEnumCreate} />*/}
            <Route path="/audit-log" exact component={AuditLogList} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
