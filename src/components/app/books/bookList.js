import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Container} from "@material-ui/core";
import {fetchBook} from "../../model/actions/book-actions";
import {fetchOrder} from "../../model/actions/order-actions";
import BookInfo from "./bookInfo";


const mapStateToProps = (state) => {
    return {
        book: state.book,
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchBook: () => fetchBook(),
    fetchOrder: () => fetchOrder(),
}, dispatch);


class BookList extends Component {
    componentDidMount() {
        this.props.fetchBook();
        this.props.fetchOrder();
    }

    render() {
        const books = this.props.book.data;
        return (!books.length ? (
                <div>
                    <h1>Books for sale</h1>
                    <h3>Loading</h3>
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