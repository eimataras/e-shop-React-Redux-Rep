import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {addBook} from '../../model/actions/book-actions';
import {BookState} from "../../model/dataTypes/BookState";
import {CurrentUserState} from "../../model/dataTypes/CurrentUserState";
import AccessDenied from "../auth/accessDenied";

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    book: state.book,
});


const mapDispatchToProps = (dispatch) => bindActionCreators({
    addBook: (book) => addBook(book),
}, dispatch);


interface AddBookProps extends RouteComponentProps {
    addBook: (book: IBook) => void;
    currentUser: CurrentUserState;
    book: BookState;
}

export interface IBook {
    title: string;
    author: string;
    published_date: string;
    book_cover: string;
    quantity: string;
}


const AddBook: React.FC<AddBookProps> = (props) => {
    const {isAuthenticated} = props.currentUser;
    const {error} = props.book;
    const [book, setBook] = useState<IBook>({
        title: '',
        author: '',
        published_date: '',
        book_cover: '',
        quantity: '',
    });

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.id]: e.target.value,
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
        });
    };

    if (!isAuthenticated) {
        return (<AccessDenied/>)
    }

    return (
        <Container fixed maxWidth="xs">
            <Paper className="padding">
                <div className="center">
                    <form autoComplete="off">
                        <h1>Add a new book:</h1>
                        {error === 'Bad Request' ? (
                            <h5 style={{color: 'red'}}>Bad request! Make sure you fill up the form
                                correctly.</h5>) : ''}
                        <TextField
                            id="title"
                            variant="outlined"
                            label="Title"
                            value={book.title}
                            onChange={handleChange}
                        />
                        <TextField
                            id="author"
                            variant="outlined"
                            label="Author"
                            value={book.author}
                            onChange={handleChange}
                        />
                        <TextField
                            id="published_date"
                            variant="outlined"
                            label="Published date"
                            value={book.published_date}
                            onChange={handleChange}
                        />
                        <TextField
                            id="book_cover"
                            variant="outlined"
                            label="Book cover http://..."
                            value={book.book_cover}
                            onChange={handleChange}
                        />
                        <TextField
                            id="quantity"
                            variant="outlined"
                            label="Quantity"
                            value={book.quantity}
                            onChange={handleChange}
                        />
                        <div className="padding">
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </Paper>
        </Container>
    );
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(AddBook) as React.ComponentType<AddBookProps>;
