import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { deleteEnum, fetchEnums} from '../../store/actions';

class FavoriteThingEnumDelete extends React.Component {
   componentDidMount() {
     if (!this.props.enumerate)
       this.props.fetchEnums();

   }

  renderActions() {
    const id = this.props.match.params.id;

    return (
      <React.Fragment>
        <button
          onClick={() => {
              this.props.deleteEnum(id);
          }}
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
    if (!this.props.enumerate) {
      return 'Are you sure you want to delete this Enum type?';
    }
    return `Are you sure you want to delete the Enum type: <${this.props.enumerate.name}:${this.props.enumerate.values}>`;
  }

  render() {
    return (
      <Modal
        title="Delete Enum type"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push(this.returnLink())}
      />
    );
  }

  returnLink = () => `/favorite-things/enums`;
}

const mapStateToProps = (state, ownProps) => {
  return { enumerate: state.models.enums[ownProps.match.params.id] };
};

export default connect(
    mapStateToProps,
  { deleteEnum,
    fetchEnums,
  }
)(FavoriteThingEnumDelete);
