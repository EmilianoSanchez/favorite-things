import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFavoriteThings } from '../../actions';

class FavoriteThingList extends React.Component {
  componentDidMount() {
    this.props.fetchFavoriteThings();
  }

  renderAdmin(favoriteThing) {
      return (
        <div className="right floated content">
          <Link to={`/favorite-things/edit/${favoriteThing.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/favorite-things/delete/${favoriteThing.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
  }

  renderList() {
    return this.props.favoriteThings.map(favoriteThing => {
      return (
        <div className="item" key={favoriteThing.id}>
          {this.renderAdmin(favoriteThing)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/favorite-things/${favoriteThing.id}`} className="header">
              {favoriteThing.title}
            </Link>
            <div className="description">{favoriteThing.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/favorite-things/new" className="ui button primary">
            Create Favorite Thing
          </Link>
        </div>
      );
  }

  render() {
    return (
      <div>
        <h2>Favorite Things</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    favoriteThings: Object.values(state.favoriteThings),
  };
};

export default connect(
  mapStateToProps,
  { fetchFavoriteThings: fetchFavoriteThings }
)(FavoriteThingList);
