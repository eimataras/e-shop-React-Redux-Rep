import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container} from '@material-ui/core';
import {fetchBook} from '../../model/actions/book-actions';
import {fetchOrder} from '../../model/actions/order-actions';
import BookInfo from './bookInfo';
import {Book, BookState} from "../../model/dataTypes/BookState";


const mapStateToProps = (state) => ({
    book: state.book,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchBook: () => fetchBook(),
    fetchOrder: () => fetchOrder(),
}, dispatch);

interface BookListProps {
    fetchBook: () => any;
    fetchOrder: () => any;
    book: BookState;
}

interface BookListState {
}

class BookList extends Component<BookListProps, BookListState> {
    componentDidMount() {
        this.props.fetchBook();
        this.props.fetchOrder();
    }

    render() {
        const {isFetching} = this.props.book;
        const error: string | undefined = this.props.book.error;
        const books: Book[] = this.props.book.data;
        return (isFetching ? (
                <div className='center'>
                    <h1>Books for sale</h1>
                    <h3>Loading</h3>
                </div>
            ) : (error !== undefined) ? (
                <div className='center'>
                    <h1>Books for sale</h1>
                    <h3 style={{color: 'red'}}>Ups... {error}...</h3>
                </div>
            ) : (
                <Container fixed maxWidth="md">
                    <h1>Books for sale</h1>
                    {books.map((book) => <BookInfo key={book.book_id} book={book}/>)}
                </Container>
            )
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BookList);
