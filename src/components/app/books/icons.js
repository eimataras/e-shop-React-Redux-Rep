import React from 'react';
import {green} from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteBook} from "../../model/actions/book-actions";
import IconButton from "@material-ui/core/IconButton";
import {addOrder, addOrderItem} from "../../model/actions/order-actions";


const mapStateToProps = (state) => {
    return {
        book: state.book
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteBook: (id) => deleteBook(id),
    addOrder: (loginUserId, statusNewId, book_id) => addOrder(loginUserId, statusNewId, book_id),
    addOrderItem: (order_id, book_id) => addOrderItem(order_id, book_id),
}, dispatch);


const Icons = (props) => {
    const handleDeleteSubmit = (id) => {
        props.deleteBook(id)
    };

    const handleAddSubmit = (loginUserId, statusNewId, order_id, book_id) => {
        console.log("Cia mano loginUserId: " + String(loginUserId));
        if (String(loginUserId) === "NaN") {
            props.history.push('/signin')
        } else if (order_id !== null) {
            console.log('Toks orderis jau yra: ' + order_id);
            props.addOrderItem(order_id, book_id)
        } else {
            console.log('Kursim nauja orderi, su knyga: ' + book_id);
            props.addOrder(loginUserId, statusNewId, book_id);
        }
    };

    return (
        <div>
            <IconButton onClick={() => handleAddSubmit(props.loginUserId, props.statusNewId, props.order_id, props.book_id)}>
                <AddShoppingCartIcon fontSize="large" style={{color: green[500]}}/>
            </IconButton>
            <IconButton onClick={() => handleDeleteSubmit(props.book_id)}>
                <Icon className="material-icons" color="secondary" fontSize="large">delete_forever</Icon>
            </IconButton>
        </div>
    );
};


export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Icons);