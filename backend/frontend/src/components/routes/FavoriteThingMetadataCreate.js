import React from 'react';
import { connect } from 'react-redux';
import {createMetadataEntry} from '../../store/actions';
import FavoriteThingMetadataForm from "../FavoriteThingMetadataForm";
import Modal from '../Modal';
import { Link } from 'react-router-dom';
import history from '../../history';

class FavoriteThingMetadataCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.createMetadataEntry(formValues);
    };

    render() {
        return (
            <Modal
                title="Add Metadata Entry"
                content={
                    <FavoriteThingMetadataForm
                        onSubmit={this.onSubmit}
                        favorite_thing_id={this.props.match.params.favorite_thing_id} />
                }
                actions={
                    <Link to={this.returnLink()} className="ui button">
                        Cancel
                    </Link>
                }
                onDismiss={() => history.push(this.returnLink())}
            />
        );
    }

    returnLink = ()=> `/favorite-things/edit/${this.props.match.params.favorite_thing_id}`;
}

export default connect(
    null,
    { createMetadataEntry }
)(FavoriteThingMetadataCreate);
