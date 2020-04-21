import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {addBook} from "../../model/actions/book-actions";
import {withRouter} from "react-router-dom";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";


const mapDispatchToProps = (dispatch) => bindActionCreators({
    addBook: (book) => addBook(book)
}, dispatch);


const AddBook = props => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        published_date: '',
        book_cover: '',
        quantity: ''
    });

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addBook(book);
        setBook({
            title: '',
            author: '',
            published_date: '',
            book_cover: '',
            quantity: '',
        })
    };

    return (
        <Container fixed maxWidth="xs">
            <Paper className="padding">
                <div align="center">
                    <form autoComplete="off">
                        <h1>Add a new book:</h1>
                        <TextField id="title" variant="outlined" label="Title" value={book.title}
                                   onChange={handleChange}/>
                        <TextField id="author" variant="outlined" label="Author" value={book.author}
                                   onChange={handleChange}/>
                        <TextField id="published_date" variant="outlined" label="Published date"
                                   value={book.published_date} onChange={handleChange}/>
                        <TextField id="book_cover" variant="outlined" label="Book cover http://..."
                                   value={book.book_cover} onChange={handleChange}/>
                        <TextField id="quantity" variant="outlined" label="Quantity" value={book.quantity}
                                   onChange={handleChange}/>
                        <div className="padding">
                            <Button variant="contained" color="secondary" type="submit"
                                    onClick={handleSubmit}>Save</Button>
                        </div>
                    </form>
                </div>
            </Paper>
        </Container>
    )
};

export default compose(withRouter, connect(undefined, mapDispatchToProps))(AddBook)