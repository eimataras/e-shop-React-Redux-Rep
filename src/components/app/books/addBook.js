import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {addBook} from "../../model/actions/book-actions";
import {withRouter} from "react-router-dom";


const mapDispatchToProps = (dispatch) => bindActionCreators({
    pridekNaujaKnyga: (knyga) => addBook(knyga)
}, dispatch);


class AddBook extends Component {
    state = {
        title: '',
        author: '',
        published_date: '',
        book_cover: '',
        quantity: '',
    };


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });

    };

    handleSubmit = (e) => {
        e.preventDefault();
        const knyga = this.state;
        console.log('Siunciamas objektas "knyga": ');
        console.log(knyga);
        this.props.pridekNaujaKnyga(knyga);
        this.setState({
            title: '',
            author: '',
            published_date: '',
            book_cover: '',
            quantity: '',
        })
    };

    render() {
        console.log('AddBook state:');
        console.log(this.state);

        return (
            <div>
                <form>
                    <h2>Add a new book:</h2>
                    <div>
                        <label htmlFor="title">Title: </label>
                        <input type="title" id="title" value={this.state.title} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="author">Author: </label>
                        <input type="author" id="author" value={this.state.author} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="published_date">Published_date: </label>
                        <input type="published_date" id="published_date" value={this.state.published_date} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="book_cover">Book_cover: </label>
                        <input type="book_cover" id="book_cover" value={this.state.book_cover} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity: </label>
                        <input type="quantity" id="quantity" value={this.state.quantity} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>Save</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default compose(
    withRouter,
    connect(undefined, mapDispatchToProps))(AddBook)