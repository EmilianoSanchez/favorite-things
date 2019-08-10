import React from 'react';
import {connect} from "react-redux";
import {selectCategory, createCategory} from "../store/actions";

class CategoryBanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    onSelectCategory = event => {
        this.props.selectCategory(event.target.value);
    };

    onSubmitAddCategory = event => {
        event.preventDefault();
        this.props.createCategory(this.state.value);
        //FIXME
        this.setState({value: ''});
    };

    handleChange = event => {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className="ui menu">
                <div className="ui large label" style={{fontSize: "2rem"}}>
                    Category:
                </div>
                <div className="item">
                    <select className="ui dropdown"
                            onChange={this.onSelectCategory}
                            value={this.props.selectedCategory} >
                        <option key={0} value={""}>---</option>
                        {
                            this.props.categories.map(
                                category => <option key={category.id} value={category.url}>{category.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="right item">
                    <form onSubmit={this.onSubmitAddCategory} className="ui action input">
                        <input type="text" placeholder="Add new category..." onChange={this.handleChange}/>
                        <button type="submit" className="ui button"  >Add</button>
                    </form>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return { selectedCategory: state.models.selectedCategory, categories: Object.values(state.models.categories) };
};

export default connect(
    mapStateToProps,
    { selectCategory, createCategory }
)(CategoryBanner);
