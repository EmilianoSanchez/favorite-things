// import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchFavoriteThing, editFavoriteThing } from '../../actions';
import FavoriteThingForm from './FavoriteThingForm';

class FavoriteThingEdit extends React.Component {
  componentDidMount() {
    this.props.fetchFavoriteThing(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editFavoriteThing(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.favoriteThing) {
      return <div>Loading...</div>;
    }

    console.log(this.props.favoriteThing);
    return (
      <div>
        <h3>Edit a Favorite Thing</h3>
        <FavoriteThingForm
          initialValues={this.props.favoriteThing}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { favoriteThing: state.favoriteThings[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchFavoriteThing: fetchFavoriteThing, editFavoriteThing: editFavoriteThing }
)(FavoriteThingEdit);
