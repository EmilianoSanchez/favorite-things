import React from 'react';
import { connect } from 'react-redux';
import { fetchMetadatas, fetchFavoriteThing, fetchEnums } from '../store/actions';
import {Field, reduxForm, formValueSelector} from "redux-form";
import { compose } from 'redux';
import {Link} from "react-router-dom";

class FavoriteThingEnumForm extends React.Component {

    componentDidMount() {
        if(this.props.enums.length === 0 )
            this.props.fetchEnums();
    }

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error"
            >
                <Field
                    name="name"
                    component={this.renderInput}
                    label="Enter Name" />
                <Field
                    name="values"
                    component={this.renderInput}
                    label="Enter Values (E.g.: value1,value2,value3"
                />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const pattern = /^[a-zA-Z0-9]+(,[a-zA-Z0-9]+)*$/

const validate = (formValues, props) => {
    const errors = {};
    if (!formValues.name) {
        errors.name = 'The enum name cannot be empty';
    } else {
        if(props.enums.some(enumerate=>enumerate.name === formValues.name))
            errors.name = 'There is other Enum type with the same name';
    }
    if (!formValues.values) {
        errors.values = 'The list of values cannot be empty';
    } else {
        if(!pattern.test(formValues.values))
            errors.values = 'Values must be a string with a comma separated list of values, such as "value1,value2,valueN".';
    }
    return errors;
};

const mapStateToProps = (state) => {
    return {
        enums: Object.values(state.models.enums),
    };
};

export default compose(
    connect(
        mapStateToProps,
        { fetchEnums }
    ),
    reduxForm({
        form: 'enumForm',
        validate})
)(FavoriteThingEnumForm);
