import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {fetchOrder, updateOrderItemQuantity, updateOrderStatus} from '../../model/actions/order-actions';
import Container from '@material-ui/core/Container';
import {ListItemText, Paper} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import Link from '@material-ui/core/Link';
import {CurrentUserRole, CurrentUserState} from "../../model/dataTypes/CurrentUserState";
import {Order, OrderState} from "../../model/dataTypes/OrderState";
import AccessDenied from "../auth/accessDenied";


const style = {
    sideMargin: {
        marginLeft: 5,
        marginRight: 5
    }
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        order: state.order,
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchOrder: () => fetchOrder(),
    updateOrderStatus: (order_id, user_id, status_id) => updateOrderStatus(order_id, user_id, status_id),
    updateOrderItemQuantity: (order_item_id, order_id, book_id, quantity) => updateOrderItemQuantity(order_item_id, order_id, book_id, quantity),
}, dispatch);

interface MyOrderProps extends RouteComponentProps {
    currentUser: CurrentUserState;
    order: OrderState;
    fetchOrder: () => void;
    updateOrderStatus: (order_id: number, user_id: number, status_id: number) => void;
    updateOrderItemQuantity: (order_item_id: number, order_id: number, book_id: number, quantity: number) => void;
}

interface MyOrderState {
}


class MyOrder extends Component<MyOrderProps, MyOrderState> {

    componentDidMount() {
        this.props.fetchOrder();
    }

    handleChangeStatus = (order_id, user_id, status_id) => {
        this.props.updateOrderStatus(order_id, user_id, status_id);
    };

    handleQuantityPlus = (order_item_id, order_id, book_id, quantity) => {
        this.props.updateOrderItemQuantity(order_item_id, order_id, book_id, quantity + 1);
    };

    handleQuantityMinus = (order_item_id, order_id, book_id, quantity) => {
        this.props.updateOrderItemQuantity(order_item_id, order_id, book_id, quantity - 1);
    };

    render() {
        const {isAuthenticated} = this.props.currentUser;
        const {isFetching} = this.props.order;
        const currentUserInfo: CurrentUserRole | undefined = isAuthenticated ? (
            this.props.currentUser.data.roles.length ? (
                this.props.currentUser.data.roles.find(info => {
                    return info;
                })
            ) : undefined) : undefined;
        const loginUserId: number | undefined = currentUserInfo ? (currentUserInfo.user_id) : undefined;
        const myNewOrder: Order | undefined = this.props.order.data.find((order) => {
            return order.user_id === loginUserId && order.status_id === 1;
        });

        if (!isAuthenticated) {
            return (<AccessDenied/>)
        }

        return (
            (isFetching) ? (
                <div className="center">
                    <h1>My order</h1>
                    <h3>Loading...</h3>
                </div>
            ) : (!myNewOrder) ? (
                <div className="center">
                    <h1>Your purchase basket is empty</h1>
                    <Link component="button"
                          onClick={() => this.props.history.push(`/`)}><h1>Start
                        shopping?</h1>
                    </Link>
                </div>
            ) : (
                <div className="center">
                    <h1>My order</h1>
                    <Container fixed maxWidth='md'>
                        <Paper>
                            <div style={{padding: 10}}>
                                <div>Hello:{' '}
                                    <span style={{fontStyle: 'italic'}}>
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
                                {myNewOrder.items.map((item) => {
                                    return (
                                        <ul key={item.order_item_id}>
                                            <ListItem>
                                                <ListItemText secondary={(
                                                    <span>"{item.title}" {item.author}<br/>Quantity: {item.quantity} </span>)}/>
                                                <IconButton
                                                    onClick={() => this.handleQuantityPlus(item.order_item_id, item.order_id, item.book_id, item.quantity)}>
                                                    <AddBoxIcon fontSize="large" style={{color: 'green'}}/>
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => this.handleQuantityMinus(item.order_item_id, item.order_id, item.book_id, item.quantity)}>
                                                    <IndeterminateCheckBoxIcon fontSize="large" style={{color: 'red'}}/>
                                                </IconButton>
                                            </ListItem>
                                        </ul>
                                    );
                                })
                                }
                                <div className="left">
                                    Order status:{' '}
                                    <span style={{fontWeight: 'bold'}}>
                                        {myNewOrder.type}
                                    </span><br/>
                                    Order ID: {myNewOrder.order_id}
                                    {myNewOrder.items.length === 0 ? (
                                        <div style={{color: 'red'}}>
                                            Cancel order:
                                            <span style={style.sideMargin}/>
                                            <Button
                                                onClick={() => this.handleChangeStatus(myNewOrder.order_id, myNewOrder.user_id, 4)}
                                                size="small" variant="contained">Cancel</Button>
                                            <span style={style.sideMargin}/>
                                        </div>
                                    ) : (
                                        <div style={{color: 'red'}}>
                                            Confirm/cancel order:
                                            <span style={style.sideMargin}/>
                                            <Button
                                                onClick={() => this.handleChangeStatus(myNewOrder.order_id, myNewOrder.user_id, 2)}
                                                size="small" variant="contained">Confirm</Button>
                                            <span style={style.sideMargin}/>
                                            <Button
                                                onClick={() => this.handleChangeStatus(myNewOrder.order_id, myNewOrder.user_id, 4)}
                                                size="small" variant="contained">Cancel</Button>
                                            <span style={style.sideMargin}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Paper>
                    </Container>
                </div>
            )
        );
    };
}


export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(MyOrder) as React.ComponentType<MyOrderProps>;
