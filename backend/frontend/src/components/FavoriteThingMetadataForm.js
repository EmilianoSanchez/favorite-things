import React from 'react';
import { connect } from 'react-redux';
import { fetchMetadatas, fetchFavoriteThing, fetchEnums } from '../store/actions';
import {Field, reduxForm, formValueSelector} from "redux-form";
import { compose } from 'redux';

class FavoriteThingMetadataForm extends React.Component {

    componentDidMount() {
        if(this.props.favoriteThing == null)
            this.props.fetchFavoriteThing(this.props.favorite_thing_id);
        if(this.props.metadatas.length === 0 )
            this.props.fetchMetadatas();
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

    renderKeyInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };

    renderTypeInput = ({ input, label, meta }) => {

        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <select {...input} autoComplete="off" >
                    <option value="Text">Text</option>
                    <option value="Number">Number</option>
                    <option value="Date">Date</option>
                    <option value="Enum">Enum</option>
                </select>
                {this.renderError(meta)}
            </div>
        );
    };

    renderValueInput = ({ input, meta, valueType }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        switch(valueType){
            case "Text":
                return (
                    <div className={className}>
                        <label>Enter text value</label>
                        <input {...input} autoComplete="off" />
                        {this.renderError(meta)}
                    </div>
                );
            case "Number":
                return (
                    <div className={className}>
                        <label>Enter number value</label>
                        <input {...input} autoComplete="off" type="number" />
                        {this.renderError(meta)}
                    </div>
                );
            case "Date":
                return (
                    <div className={className}>
                        <label>Enter date value</label>
                        <input {...input} autoComplete="off" type={"date"} />
                        {this.renderError(meta)}
                    </div>
                );
            default:
                return null;
        }
    };

    renderEnumTypeInput = ({ input, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
                return (
                    <span className={className}>
                            <label>Select enum type</label>
                            <select {...input}
                                    autoComplete="off"
                                    onChange={
                                        (event)=>{
                                            this.props.change("enum",event.target.value);
                                            this.props.change("enumValue","");
                                        }
                                    }
                            >
                                <option disabled value=""> -- select an option -- </option>
                                {this.props.enums.map(
                                    enumerate => {
                                        return (
                                            <option key={enumerate.id} value={enumerate.id}>{enumerate.name}</option>
                                        )
                                    }
                                )}
                            </select>
                        {this.renderError(meta)}
                    </span>
                );
    };

    renderEnumValueInput = ({ input, meta, enumType }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        const selectedEnum=this.props.enums.find(enumerate=>enumerate.id==enumType);
        return (
            <span className={className}>
                            <label>Select enum value</label>
                            <select {...input} autoComplete="off" >
                            <option disabled value=""></option>
                            {selectedEnum?selectedEnum.values.split(",").map(
                                (enumValue,enumValuePos) => {
                                    return (
                                        <option key={enumValuePos} value={enumValue}>{enumValue}</option>
                                    )
                                }
                            ):null}
                            </select>
                {this.renderError(meta)}
            </span>
        );
    };

    onSubmit = formValues => {
        formValues.favorite_thing_id = this.props.favorite_thing.id;
        formValues.favorite_thing = this.props.favorite_thing.url;
        formValues.favorite_thing = this.props.favorite_thing.url;
        if(formValues.type==="Enum") {
            formValues.enum = this.props.enums.find(enumerate => enumerate.id == this.props.enumType).url;
            formValues.value = formValues.enumValue;
        }
        this.props.onSubmit(formValues);
    };

    render() {
        const valueField = this.props.valueType==="Enum"?(
            <span>
                <Field
                    name="enum"
                    component={this.renderEnumTypeInput}
                />
                <Field
                    name="enumValue"
                    component={this.renderEnumValueInput}
                    enumType={this.props.enumType}
                />
                {/*<button onClick={() => history.push("/favorite-things/new-enum")}>Add enum</button>*/}
            </span>
            ):(
            <Field
                name="value"
                component={this.renderValueInput}
                valueType={this.props.valueType}
            />
        );

        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error"
            >
                <Field
                    name="key"
                    component={this.renderKeyInput}
                    label="Enter key name" />
                <Field
                    name="type"
                    component={this.renderTypeInput}
                    label="Enter value type" />
                {valueField}
                <button className="ui button primary">Add</button>
            </form>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    const newProps = {
        favorite_thing: state.models.favoriteThings[ownProps.favorite_thing_id],
        metadatas: Object.values(state.models.metadatas).filter(metadata=> metadata.favorite_thing_id == ownProps.favorite_thing_id ),
        enums: Object.values(state.models.enums),
        valueType: selector(state,'type'),
        enumType: selector(state,'enum'),
    };
    return newProps;
};

const validate = (formValues, props) => {

    const errors = {};

    if (!formValues.key) {
        errors.key = 'The key name cannot be empty';
    }
    if (formValues.key && props.metadatas.find(metadata=>metadata.key===formValues.key)) {
        errors.key = 'There is other metadata entry with the same key';
    }

    if (!formValues.value) {
        switch(formValues.type){
            case "Number":
                errors.value = 'The value must be a number';
                break;
            case "Date":
                errors.value = 'The value must be a date';
                break;
            default:
                errors.value = 'The value cannot be empty';
                break;
        }
    }
    if(formValues.type=="Enum"){
        if(!formValues.enum || formValues.enum==="") {
            errors.enum = 'You must select an Enum type';
        }
        if(!formValues.enumValue) {
            errors.enumValue = 'You must select an Enum value';
        }
    }

    return errors;
};

const selector = formValueSelector('metadataForm')

export default compose(
    connect(
        mapStateToProps,
        { fetchMetadatas, fetchFavoriteThing, fetchEnums }
    ),
    reduxForm({
        form: 'metadataForm',
        initialValues: { type: "Text"},
        validate})
)(FavoriteThingMetadataForm);
