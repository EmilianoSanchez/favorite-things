import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAll } from '../../store/actions';
import CategoryBanner from "../CategoryBanner";

class FavoriteThingList extends React.Component {
  componentDidMount() {
    this.props.fetchAll();
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
    const filteredList = this.props.selectedCategory===''?
        this.props.favoriteThings:
        this.props.favoriteThings.filter(favoriteThing =>
            favoriteThing.category === this.props.selectedCategory
        );

    return filteredList.map(favoriteThing => {
          return (
            <div className="item" key={favoriteThing.id}>
              {this.renderAdmin(favoriteThing)}
              <i className="large middle aligned icon camera" />
              <div className="content">
                <Link to={`/favorite-things/${favoriteThing.id}`} className="header">
                  {favoriteThing.title}
                </Link>
                <div className="description">{favoriteThing.description}</div>
                  <div className="list">
                      <div className="item">{`\tCreated on: ${favoriteThing.created_date}`}</div>
                      <div className="item">{`\tLast modified on: ${favoriteThing.modified_date}`}</div>
                  </div>
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
        <CategoryBanner />
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
      selectedCategory: state.models.selectedCategory,
      favoriteThings: Object.values(state.models.favoriteThings),
      categories: Object.values(state.models.categories),
  };
};

export default connect(
  mapStateToProps,
  { fetchAll: fetchAll }
)(FavoriteThingList);
