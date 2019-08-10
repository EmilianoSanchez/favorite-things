import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { deleteMetadataEntry, fetchMetadatas} from '../../store/actions';

class FavoriteThingMetadataDelete extends React.Component {
   componentDidMount() {
     if (!this.props.metadataEntry) {
       this.props.fetchMetadatas();
     }
   }

  renderActions() {
    const { favorite_thing_id, id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteMetadataEntry(favorite_thing_id, id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to={this.returnLink()} className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.metadataEntry) {
      return 'Are you sure you want to delete this Metadata Entry?';
    }
    return `Are you sure you want to delete the Metadata Entry: <${this.props.metadataEntry.key}:${this.props.metadataEntry.value}>`;
  }

  render() {
    return (
      <Modal
        title="Delete Metadata Entry"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push(this.returnLink())}
      />
    );
  }

  returnLink = () => `/favorite-things/edit/${this.props.match.params.favorite_thing_id}`;
}

const mapStateToProps = (state, ownProps) => {
  return { metadataEntry: state.models.metadatas[ownProps.match.params.id] };
};

export default connect(
    mapStateToProps,
  { deleteMetadataEntry,
    fetchMetadatas,
  }
)(FavoriteThingMetadataDelete);
