import React from 'react';
import { connect } from 'react-redux';
import { fetchFavoriteThing } from '../../actions';

class FavoriteThingShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchFavoriteThing(id);
  }

  render() {
    if (!this.props.favoriteThing) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.favoriteThing;

    return (
      <div>
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { favoriteThing: state.favoriteThings[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchFavoriteThing: fetchFavoriteThing }
)(FavoriteThingShow);
