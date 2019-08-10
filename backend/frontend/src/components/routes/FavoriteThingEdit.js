// import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchFavoriteThing, editFavoriteThing } from '../../store/actions';
import FavoriteThingForm from '../FavoriteThingForm';
import FavoriteThingMetadataList from '../FavoriteThingMetadataList';

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

    return (
      <div>
        <h3>Edit a Favorite Thing</h3>
        <FavoriteThingForm
          initialValues={this.props.favoriteThing}
          onSubmit={this.onSubmit}
        />
        <h3>Metadata</h3>
        <FavoriteThingMetadataList favorite_thing_id={this.props.favoriteThing.id} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { favoriteThing: state.models.favoriteThings[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchFavoriteThing, editFavoriteThing }
)(FavoriteThingEdit);
