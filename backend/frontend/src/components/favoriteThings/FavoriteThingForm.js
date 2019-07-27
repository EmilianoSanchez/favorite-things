import React from 'react';
import { Field, reduxForm } from 'redux-form';

class FavoriteThingForm extends React.Component {

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
            name="title"
            component={this.renderInput}
            label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <Field
            name="ranking"
            component={this.renderInput}
            label="Enter Ranking"
        />
        <Field
            name="category"
            component={this.renderInput}
            label="Enter Category"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }

}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (formValues.description && formValues.description.length < 10) {
    errors.description = 'The minimum length of a description is of 10 characters';
  }

  if (formValues.ranking && !isPositiveInteger(formValues.ranking)) {
    errors.ranking = 'Provided ranking must be an integer number equals or greater than 1';
  }

  if (!formValues.category) {
    errors.category = 'You must enter a category';
  }

  return errors;
};

const isPositiveInteger = s => {
  return /^\+?[1-9][\d]*$/.test(s);
}

export default reduxForm({
  form: 'favoriteThingForm',
  validate
})(FavoriteThingForm);
