import React, {useEffect} from 'react';
import {green} from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteBook} from "../../model/actions/book-actions";
import IconButton from "@material-ui/core/IconButton";
import {addOrder, addOrderItem, fetchOrder} from "../../model/actions/order-actions";


const mapStateToProps = (state) => {
    return {
        order: state.order,
        currentUser: state.currentUser
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchOrder: () => fetchOrder(),
    deleteBook: (id) => deleteBook(id),
    addOrder: (loginUserId, statusNewId, book_id) => addOrder(loginUserId, statusNewId, book_id),
    addOrderItem: (order_id, book_id) => addOrderItem(order_id, book_id),
}, dispatch);


const Icons = (props) => {

    useEffect(() => {
        console.log("Component Did Mount equivalent");
        props.fetchOrder();
        return () => {
            console.log("Component Will Unmount equivalent")
        };
    }, []);


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
                props.history.push('/signin')
            } else if (order_id !== undefined) {
                props.addOrderItem(order_id, book_id)
            } else {
                console.log("addOrder clicked")
                props.addOrder(loginUserId, statusNewId, book_id);
            }
        } else {
            props.history.push('/signin')
        }
    };

    if (loginUserId && (loginUserRole === "ADMIN")) {
        return (
            <div>
                <IconButton
                    onClick={() => handleAddSubmit(loginUserId, statusNewId, props.book_id)}>
                    <AddShoppingCartIcon fontSize="large" style={{color: green[500]}}/>
                </IconButton>
                <IconButton onClick={() => handleDeleteSubmit(props.book_id)}>
                    <Icon className="material-icons" color="secondary" fontSize="large">delete_forever</Icon>
                </IconButton>
            </div>
        )
    } else {
        return (
            <div>
                <IconButton
                    onClick={() => handleAddSubmit(loginUserId, statusNewId, props.book_id)}>
                    <AddShoppingCartIcon fontSize="large" style={{color: green[500]}}/>
                </IconButton>
            </div>
        );
    }
};


export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Icons);