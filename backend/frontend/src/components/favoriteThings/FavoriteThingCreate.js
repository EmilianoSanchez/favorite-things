import React from 'react';
import { connect } from 'react-redux';
import { createFavoriteThing } from '../../actions';
import FavoriteThingForm from './FavoriteThingForm';

class FavoriteThingCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createFavoriteThing(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a Favorite Thing</h3>
        <FavoriteThingForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createFavoriteThing: createFavoriteThing }
)(FavoriteThingCreate);
