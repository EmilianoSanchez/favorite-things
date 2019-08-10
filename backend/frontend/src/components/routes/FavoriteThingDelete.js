import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchFavoriteThing, deleteFavoriteThing } from '../../store/actions';

class FavoriteThingDelete extends React.Component {
  componentDidMount() {
    this.props.fetchFavoriteThing(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteFavoriteThing(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.favoriteThing) {
      return 'Are you sure you want to delete this Favorite Thing?';
    }

    return `Are you sure you want to delete the Favorite Thing with title: ${
      this.props.favoriteThing.title
    }`;
  }

  render() {
    return (
      <Modal
        title="Delete Favorite Thing"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { favoriteThing: state.models.favoriteThings[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchFavoriteThing: fetchFavoriteThing, deleteFavoriteThing: deleteFavoriteThing }
)(FavoriteThingDelete);
