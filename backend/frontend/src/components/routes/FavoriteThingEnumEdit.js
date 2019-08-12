// import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import {
    createEnum,
    deleteEnum,
    fetchEnums,
} from '../../store/actions';
import {Link} from "react-router-dom";

class FavoriteThingEnumEdit extends React.Component {

    componentDidMount() {
        if(this.props.enums.length === 0)
            this.props.fetchEnums();
    }

    renderAdmin(enumerate) {
        return (
            <div className="right floated content">
                <Link
                    to={`/favorite-things/enums/delete/${enumerate.id}`}
                    className="ui button negative"
                >
                    Delete
                </Link>
            </div>
        );
    }

    renderList() {
        return this.props.enums.map(enumerate => {
            return (
                <div className="item" key={enumerate.id}>
                    {this.renderAdmin(enumerate)}
                    <i className={"large middle aligned icon list"} />
                    <div className="content">
                        <div className="header">
                            {enumerate.name}
                        </div>
                        <div className="description">{enumerate.values}</div>
                    </div>
                </div>
            );
        });
    }

    renderCreate() {
        return (
            <div style={{ textAlign: 'right' }}>
                <Link to={`/favorite-things/enums/new`} className="ui button primary">
                    Add Enum type
                </Link>
            </div>
        );
    }

  render() {
    if (!this.props.enums) {
      return <div>Loading...</div>;
    }

    return (
      <div>
          <h3>Enum types</h3>
          <div className="ui celled list">{this.renderList()}</div>
          {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        enums: Object.values(state.models.enums),
    };
};

export default connect(
    mapStateToProps,
    { createEnum, deleteEnum, fetchEnums }
)(FavoriteThingEnumEdit);
