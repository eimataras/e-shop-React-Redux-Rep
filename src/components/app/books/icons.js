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
        order: state.order,
        currentUser: state.currentUser
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteBook: (id) => deleteBook(id),
    addOrder: (loginUserId, statusNewId, book_id) => addOrder(loginUserId, statusNewId, book_id),
    addOrderItem: (order_id, book_id) => addOrderItem(order_id, book_id),
}, dispatch);


const Icons = (props) => {

    const {isAuthenticated} = props.currentUser;
    const currentUserInfo = isAuthenticated ? (
        props.currentUser.data.roles.length ? (
            props.currentUser.data.roles.find(info => {
                return info
            })
        ) : undefined) : ('');
    const loginUserId = currentUserInfo.user_id;
    const loginUserRole = currentUserInfo.role_name;
    const statusNewId = 1;


    const handleDeleteSubmit = (id) => {
        props.deleteBook(id)
    };

    const handleAddSubmit = (loginUserId, statusNewId, book_id) => {
        if (!props.order.data.error) {
            //Gaunam prisiloginusio vartotojo orderi su statusu NEW
            const myOrder = props.order.data.find(order => {
                return order.user_id === loginUserId && order.status_id === statusNewId
            });
            const order_id = myOrder ? (myOrder.order_id) : undefined;

            if (loginUserId === undefined) {
                console.log("nerado loginUserId");
                props.history.push('/signin')
            } else if (order_id !== undefined) {
                console.log("addOrderitem clicked");
                props.addOrderItem(order_id, book_id)
            } else {
                console.log("addOrder clicked");
                props.addOrder(loginUserId, statusNewId, book_id);
            }
        } else {
            console.log("gavom order.data.error 403");
            props.history.push('/signin')
        }
    };

    return (
        (loginUserId && (loginUserRole === "ADMIN")) ? (
            <div>
                <IconButton
                    onClick={() => handleAddSubmit(loginUserId, statusNewId, props.book_id)}>
                    <AddShoppingCartIcon fontSize="large" style={{color: green[500]}}/>
                </IconButton>
                <IconButton onClick={() => handleDeleteSubmit(props.book_id)}>
                    <Icon className="material-icons" color="secondary" fontSize="large">delete_forever</Icon>
                </IconButton>
            </div>
        ) : (
            <div>
                <IconButton
                    onClick={() => handleAddSubmit(loginUserId, statusNewId, props.book_id)}>
                    <AddShoppingCartIcon fontSize="large" style={{color: green[500]}}/>
                </IconButton>
            </div>
        )
    );
};


export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Icons);