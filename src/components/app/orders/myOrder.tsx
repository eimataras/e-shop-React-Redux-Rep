import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { ListItemText, Paper } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import Link from '@material-ui/core/Link';
import { fetchOrder, updateOrderItemQuantity, updateOrderStatus } from '../../model/actions/order-actions';
import { CurrentUserRole, CurrentUserState } from '../../model/dataTypes/CurrentUserState';
import { Order, OrderState } from '../../model/dataTypes/OrderState';
import AccessDenied from '../auth/accessDenied';
import Spinner from '../layout/spinner';


const style = {
    sideMargin: {
        marginLeft: 5,
        marginRight: 5,
    },
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    order: state.order,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchOrder: () => fetchOrder(),
    updateOrderStatus: (orderId, userId, statusId) => updateOrderStatus(orderId, userId, statusId),
    updateOrderItemQuantity: (orderItemId, orderId, bookId, quantity) => updateOrderItemQuantity(orderItemId, orderId, bookId, quantity),
}, dispatch);

interface MyOrderProps extends RouteComponentProps {
    currentUser: CurrentUserState;
    order: OrderState;
    fetchOrder: () => void;
    updateOrderStatus: (orderId: number, userId: number, statusId: number) => void;
    updateOrderItemQuantity: (orderItemId: number, orderId: number, bookId: number, quantity: number) => void;
}

interface MyOrderState {
}


class MyOrder extends Component<MyOrderProps, MyOrderState> {
    componentDidMount() {
        this.props.fetchOrder();
    }

    handleChangeStatus = (orderId, userId, statusId) => {
        this.props.updateOrderStatus(orderId, userId, statusId);
    };

    handleQuantityPlus = (orderItemId, orderId, bookId, quantity) => {
        this.props.updateOrderItemQuantity(orderItemId, orderId, bookId, quantity + 1);
    };

    handleQuantityMinus = (orderItemId, orderId, bookId, quantity) => {
        this.props.updateOrderItemQuantity(orderItemId, orderId, bookId, quantity - 1);
    };

    render() {
        const { isAuthenticated } = this.props.currentUser;
        const { isFetching } = this.props.order;
        const currentUserInfo: CurrentUserRole | undefined = isAuthenticated && this.props.currentUser?.data?.roles ? (
            this.props.currentUser.data.roles.find((info) => info)
        ) : undefined;
        const loginUserId: number | undefined = currentUserInfo ? (currentUserInfo.userId) : undefined;
        const myNewOrder: Order | undefined = this.props.order.data.find((order) => order.userId === loginUserId && order.statusId === 1);

        if (!isAuthenticated) {
            return (<AccessDenied/>);
        }

        if (isFetching) {
            return (
                <div className="center">
                    <h1>My order</h1>
                    <Spinner/>
                </div>
            );
        }

        if (!myNewOrder) {
            return (
                <div className="center">
                    <h1>Your purchase basket is empty</h1>
                    <Link component="button" onClick={() => this.props.history.push('/')}>
                        <h1>Start shopping?</h1>
                    </Link>
                </div>
            );
        }

        return (
            <div className="center">
                <h1>My order</h1>
                <Container fixed maxWidth='md'>
                    <Paper>
                        <div style={{ padding: 10 }}>
                            <div>Hello:{' '}
                                <span style={{ fontStyle: 'italic' }}>
                                    {myNewOrder.name} {myNewOrder.surname}
                                </span>,
                                {myNewOrder.items.length === 0 ? (
                                    <p>You have no books in your basket.{' '}
                                        <Link component="button" onClick={() => this.props.history.push('/')}>
                                            Continue shopping?
                                        </Link>
                                    </p>
                                ) : (
                                    <p>this is your purchase basket</p>)}
                            </div>
                            {myNewOrder.items.map((item) => (
                                <ul key={item.orderItemId}>
                                    <ListItem>
                                        <ListItemText secondary={(
                                            <span>&quot;{item.title}&quot; {item.author}<br/>Quantity: {item.quantity} </span>)}/>
                                        <IconButton
                                            onClick={() => this.handleQuantityPlus(item.orderItemId, item.orderId, item.bookId, item.quantity)}>
                                            <AddBoxIcon fontSize="large" style={{ color: 'green' }}/>
                                        </IconButton>
                                        <IconButton
                                            onClick={() => this.handleQuantityMinus(item.orderItemId, item.orderId, item.bookId, item.quantity)}>
                                            <IndeterminateCheckBoxIcon fontSize="large" style={{ color: 'red' }}/>
                                        </IconButton>
                                    </ListItem>
                                </ul>
                            ))
                            }
                            <div className="left">
                                Order status:{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                    {myNewOrder.type}
                                </span><br/>
                                Order ID: {myNewOrder.orderId}
                                {myNewOrder.items.length === 0 ? (
                                    <div style={{ color: 'red' }}>
                                        Cancel order:
                                        <span style={style.sideMargin}/>
                                        <Button
                                            onClick={() => this.handleChangeStatus(myNewOrder.orderId, myNewOrder.userId, 4)}
                                            size="small" variant="contained">Cancel</Button>
                                        <span style={style.sideMargin}/>
                                    </div>
                                ) : (
                                    <div style={{ color: 'red' }}>
                                        Confirm/cancel order:
                                        <span style={style.sideMargin}/>
                                        <Button
                                            onClick={() => this.handleChangeStatus(myNewOrder.orderId, myNewOrder.userId, 2)}
                                            size="small" variant="contained">Confirm</Button>
                                        <span style={style.sideMargin}/>
                                        <Button
                                            onClick={() => this.handleChangeStatus(myNewOrder.orderId, myNewOrder.userId, 4)}
                                            size="small" variant="contained">Cancel</Button>
                                        <span style={style.sideMargin}/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Paper>
                </Container>
            </div>
        );
    }
}


export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(MyOrder) as React.ComponentType<MyOrderProps>;
