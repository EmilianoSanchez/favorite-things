import React from 'react';
import { connect } from 'react-redux';
import {createEnum} from '../../store/actions';
import FavoriteThingEnumForm from "../FavoriteThingEnumForm";
import Modal from '../Modal';
import { Link } from 'react-router-dom';
import history from '../../history';

class FavoriteThingEnumCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.createEnum(formValues);
    };

    render() {
        return (
            <Modal
                title="Add Enum type"
                content={
                    <FavoriteThingEnumForm
                        onSubmit={this.onSubmit}
                    />
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

    returnLink = ()=> `/favorite-things/enums`;
}

export default connect(
    null,
    { createEnum }
)(FavoriteThingEnumCreate);
