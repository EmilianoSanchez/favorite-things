import React from 'react';
import { connect } from 'react-redux';
import {createMetadataEntry, deleteMetadataEntry, fetchMetadatas} from "../store/actions";
import {Link} from "react-router-dom";

class FavoriteThingMetadataList extends React.Component {

    componentDidMount() {
        if(this.props.metadatas.length === 0)
            this.props.fetchMetadatas();
    }

    renderAdmin({favorite_thing_id,id}) {
        return (
            <div className="right floated content">
                <Link
                    to={`/favorite-things/edit/${favorite_thing_id}/metadata/delete/${id}`}
                    className="ui button negative"
                >
                    Delete
                </Link>
            </div>
        );
    }

    renderList() {
        return this.props.metadatas.map(metadata => {
            return (
                <div className="item" key={metadata.id}>
                    {this.renderAdmin(metadata)}
                    <i className={"large middle aligned icon code"} />
                    <div className="content">
                        <div className="header">
                            {metadata.key}
                        </div>
                        <div className="description">{metadata.value}</div>
                    </div>
                </div>
            );
        });
    }

    renderCreate() {
        return (
            <div style={{ textAlign: 'right' }}>
                <Link to={`/favorite-things/edit/${this.props.favorite_thing_id}/metadata/new`} className="ui button primary">
                    Add metadata entry
                </Link>
            </div>
        );
    }

  render() {
    return (
      <div>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
    return {
        metadatas: Object.values(state.models.metadatas).filter(metadata=> metadata.favorite_thing_id === ownProps.favorite_thing_id),
    };
};

export default connect(
    mapStateToProps,
    { createMetadataEntry, deleteMetadataEntry, fetchMetadatas }
)(FavoriteThingMetadataList);
