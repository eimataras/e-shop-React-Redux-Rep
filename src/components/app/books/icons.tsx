import React from 'react';
import {green} from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {bindActionCreators, compose} from 'redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import {deleteBook} from '../../model/actions/book-actions';
import {addOrder, addOrderItem} from '../../model/actions/order-actions';
import {CurrentUserRole, CurrentUserState} from "../../model/dataTypes/CurrentUserState";
import {Order, OrderState} from "../../model/dataTypes/OrderState";


const mapStateToProps = (state) => ({
    order: state.order,
    currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteBook: (id) => deleteBook(id),
    addOrder: (loginUserId, statusNewId, book_id) => addOrder(loginUserId, statusNewId, book_id),
    addOrderItem: (order_id, book_id) => addOrderItem(order_id, book_id),
}, dispatch);


interface IconsProps extends RouteComponentProps {
    currentUser: CurrentUserState;
    order: OrderState;
    deleteBook: (id: number) => void;
    addOrderItem: (order_id: number, book_id: number) => void;
    addOrder: (loginUserId: number, statusNewId: number, book_id: number) => void;
}

interface PassedProps {
    book_id: number | undefined;
}

type Props = IconsProps & PassedProps;

const Icons: React.FC<Props> = (props) => {
    const {isAuthenticated} = props.currentUser;
    const currentUserInfo: CurrentUserRole | undefined = isAuthenticated ? (
        props.currentUser.data.roles.length ? (
            props.currentUser.data.roles.find((info) => info)
        ) : undefined) : undefined;
    const loginUserId: number | undefined = currentUserInfo ? (currentUserInfo.user_id) : undefined;
    const loginUserRole: string | undefined = currentUserInfo ? (currentUserInfo.role_name) : undefined;
    const statusNewId: number = 1;


    const handleDeleteSubmit = (id) => {
        props.deleteBook(id);
    };

    const handleAddSubmit = (loginUserId, statusNewId, book_id) => {
        if (isAuthenticated) {
            // Gaunam prisiloginusio vartotojo orderi su statusu NEW
            const myOrder: Order | undefined = props.order.data.find((order) => order.user_id === loginUserId && order.status_id === statusNewId);
            const order_id: number | undefined = myOrder ? (myOrder.order_id) : undefined;

            if (!loginUserId) {
                props.history.push('/signin');
            } else if (order_id) {
                props.addOrderItem(order_id, book_id);
            } else {
                props.addOrder(loginUserId, statusNewId, book_id);
            }
        } else {
            props.history.push('/signin');
        }
    };

    return (
        (loginUserId && (loginUserRole === 'ADMIN')) ? (
            <div>
                <IconButton onClick={() => handleAddSubmit(loginUserId, statusNewId, props.book_id)}>
                    <AddShoppingCartIcon fontSize="large" style={{color: green[500]}}/>
                </IconButton>
                <IconButton onClick={() => handleDeleteSubmit(props.book_id)}>
                    <Icon className="material-icons" color="secondary" fontSize="large">delete_forever</Icon>
                </IconButton>
            </div>
        ) : (
            <div>
                <IconButton onClick={() => handleAddSubmit(loginUserId, statusNewId, props.book_id)}>
                    <AddShoppingCartIcon fontSize="large" style={{color: green[500]}}/>
                </IconButton>
            </div>
        )
    );
};


export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Icons) as React.ComponentType<PassedProps>;
