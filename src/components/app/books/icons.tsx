import React from 'react';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { bindActionCreators, compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { deleteBook } from '../../model/actions/book-actions';
import { addOrder, addOrderItem } from '../../model/actions/order-actions';
import { CurrentUserRole, CurrentUserState } from '../../model/dataTypes/CurrentUserState';
import { Order, OrderState } from '../../model/dataTypes/OrderState';


const mapStateToProps = (state) => ({
    order: state.order,
    currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteBook: (id) => deleteBook(id),
    addOrder: (loginUserId, statusNewId, bookId) => addOrder(loginUserId, statusNewId, bookId),
    addOrderItem: (orderId, bookId) => addOrderItem(orderId, bookId),
}, dispatch);


interface IconsProps extends RouteComponentProps {
    currentUser: CurrentUserState;
    order: OrderState;
    deleteBook: (id: number) => void;
    addOrderItem: (orderId: number, bookId: number) => void;
    addOrder: (loginUserId: number, statusNewId: number, bookId: number) => void;
}

interface PassedProps {
    bookId: number | undefined;
}

type Props = IconsProps & PassedProps;

const Icons: React.FC<Props> = (props) => {
    const { isAuthenticated } = props.currentUser;
    const currentUserInfo: CurrentUserRole | undefined = isAuthenticated && props.currentUser?.data?.roles ? (
        props.currentUser.data.roles.find((info) => info)) : undefined;
    const loginUserId: number | undefined = currentUserInfo ? (currentUserInfo.userId) : undefined;
    const loginUserRole: string | undefined = currentUserInfo ? (currentUserInfo.roleName) : undefined;
    const statusNewId: number = 1;


    const handleDeleteSubmit = (id) => {
        props.deleteBook(id);
    };

    const handleAddSubmit = (bookId) => {
        if (isAuthenticated) {
            // Gaunam prisiloginusio vartotojo orderi su statusu NEW
            const myOrder: Order | undefined = props.order.data.find((order) => order.userId === loginUserId && order.statusId === statusNewId);
            const orderId: number | undefined = myOrder ? (myOrder.orderId) : undefined;

            if (!loginUserId) {
                props.history.push('/signin');
            } else if (orderId) {
                props.addOrderItem(orderId, bookId);
            } else {
                props.addOrder(loginUserId, statusNewId, bookId);
            }
        } else {
            props.history.push('/signin');
        }
    };

    return (
        (loginUserId && (loginUserRole === 'ADMIN')) ? (
            <div>
                <IconButton onClick={() => handleAddSubmit(props.bookId)}>
                    <AddShoppingCartIcon fontSize="large" style={{ color: green[500] }}/>
                </IconButton>
                <IconButton onClick={() => handleDeleteSubmit(props.bookId)}>
                    <Icon className="material-icons" color="secondary" fontSize="large">delete_forever</Icon>
                </IconButton>
            </div>
        ) : (
            <div>
                <IconButton onClick={() => handleAddSubmit(props.bookId)}>
                    <AddShoppingCartIcon fontSize="large" style={{ color: green[500] }}/>
                </IconButton>
            </div>
        )
    );
};


export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Icons) as React.ComponentType<PassedProps>;
