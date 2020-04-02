import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {addBook} from "../../model/actions/book-actions";
import {withRouter} from "react-router-dom";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";


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

        return (
            <Container fixed maxWidth="xs">
                <Paper className="padding">
                    <div align="center">
                        <form autoComplete="off">
                            <h1>Add a new book:</h1>
                            <TextField id="title" variant="outlined" label="Title" value={this.state.title}
                                       onChange={this.handleChange}/>
                            <TextField id="author" variant="outlined" label="Author" value={this.state.author}
                                       onChange={this.handleChange}/>
                            <TextField id="published_date" variant="outlined" label="Published date"
                                       value={this.state.published_date} onChange={this.handleChange}/>
                            <TextField id="book_cover" variant="outlined" label="Book cover http://..."
                                       value={this.state.book_cover} onChange={this.handleChange}/>
                            <TextField id="quantity" variant="outlined" label="Quantity" value={this.state.quantity}
                                       onChange={this.handleChange}/>
                            <div className="padding">
                                <Button variant="contained" color="secondary" type="submit"
                                        onClick={this.handleSubmit}>Save</Button>
                            </div>
                        </form>
                    </div>
                </Paper>
            </Container>
        )
    }
}

export default compose(
    withRouter,
    connect(undefined, mapDispatchToProps))(AddBook)