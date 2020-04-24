import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {fetchOrder, updateOrderItemQuantity, updateOrderStatus} from "../../model/actions/order-actions";
import Container from "@material-ui/core/Container";
import {ListItemText, Paper} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import Link from "@material-ui/core/Link";


const style = {
    sideMargin: {
        marginLeft: 5,
        marginRight: 5
    }
};

const mapStateToProps = (state) => {
    return {
        order: state.order,
        currentUser: state.currentUser
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchOrder: () => fetchOrder(),
    updateOrderStatus: (order_id, user_id, status_id, props) => updateOrderStatus(order_id, user_id, status_id, props),
    updateOrderItemQuantity: (order_item_id, order_id, book_id, quantity, props) => updateOrderItemQuantity(order_item_id, order_id, book_id, quantity, props),
}, dispatch);


class MyOrder extends Component {

    componentDidMount() {
        this.props.fetchOrder();
    }

    handleChangeStatus = (order_id, user_id, status_id) => {
        this.props.updateOrderStatus(order_id, user_id, status_id, this.props)
    };

    handleQuantityPlus = (order_item_id, order_id, book_id, quantity) => {
        this.props.updateOrderItemQuantity(order_item_id, order_id, book_id, quantity + 1, this.props)
    };

    handleQuantityMinus = (order_item_id, order_id, book_id, quantity) => {
        this.props.updateOrderItemQuantity(order_item_id, order_id, book_id, quantity - 1, this.props)
    };

    render() {
        const {isAuthenticated} = this.props.currentUser;
        const currentUserInfo = isAuthenticated ? (
            this.props.currentUser.data.roles.length ? (
                this.props.currentUser.data.roles.find(info => {
                    return info
                })
            ) : undefined) : ('');
        const loginUserId = currentUserInfo.user_id;
        const orders = this.props.order.data;
        const fetchOrderErrorMessage = orders.message;
        const myOrder = !fetchOrderErrorMessage ? orders.find((order) => {
            return order.user_id === loginUserId && order.status_id === 1
        }) : null;


        return (
            ((!orders.length) && (!fetchOrderErrorMessage)) ? (
                <div align="center">
                    <h1>My order</h1>
                    <h3>Loading...</h3>
                </div>
            ) : (myOrder == null) ? (
                <div align='center'>
                    {((isAuthenticated) && (fetchOrderErrorMessage !== "Access Denied")) ? (
                        <div>
                            <h1>Your purchase basket is empty</h1>
                            <Link component="button"
                                  onClick={() => this.props.history.push(`/`)}><h1>Start
                                shopping?</h1>
                            </Link>
                        </div>
                    ) : (
                        <div align="center">
                            <h1>My order</h1>
                            <h3>{fetchOrderErrorMessage}... Please <span> </span>
                                <Link component="button" onClick={() => this.props.history.push('/signin')}>
                                    <h3>log in</h3>
                                </Link>
                            </h3>
                            {localStorage.removeItem('jwtToken')}
                        </div>
                    )}
                </div>
            ) : (
                <div align="center">
                    <h1>My order</h1>
                    <Container fixed maxWidth='md'>
                        <Paper>
                            <div style={{padding: 10}}>
                                <div>Hello: <span style={{fontStyle: "italic"}}>{myOrder.name} {myOrder.surname}</span>,
                                    {myOrder.items.length === 0 ? (
                                        <p>You have no books in your basket. <Link component="button"
                                                                                   onClick={() => this.props.history.push('/')}>Continue
                                            shopping?</Link>
                                        </p>
                                    ) : (<p>this is your purchase basket</p>)}
                                </div>
                                {myOrder.items.map((item) => {
                                    return (
                                        <ul key={item.order_item_id}>
                                            <ListItem>
                                                <ListItemText secondary={(
                                                    <span>"{item.title}" {item.author}<br/>Quantity: {item.quantity} </span>)}/>
                                                <IconButton
                                                    onClick={() => this.handleQuantityPlus(item.order_item_id, item.order_id, item.book_id, item.quantity)}>
                                                    <AddBoxIcon fontSize="large" style={{color: "green"}}/>
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => this.handleQuantityMinus(item.order_item_id, item.order_id, item.book_id, item.quantity)}>
                                                    <IndeterminateCheckBoxIcon fontSize="large" style={{color: "red"}}/>
                                                </IconButton>
                                            </ListItem>
                                        </ul>
                                    )
                                })
                                }
                                <div align='left'>Order status: <span style={{fontWeight: "bold"}}>{myOrder.type}</span>
                                    <br/>Order ID: {myOrder.order_id}
                                    {myOrder.items.length === 0 ? (
                                        <div style={{color: "red"}}> Cancel order:
                                            <span style={style.sideMargin}/>
                                            <Button
                                                onClick={() => this.handleChangeStatus(myOrder.order_id, myOrder.user_id, 4)}
                                                size="small" variant="contained">Cancel</Button>
                                            <span style={style.sideMargin}/>
                                        </div>
                                    ) : (
                                        <div style={{color: "red"}}> Confirm/cancel order:
                                            <span style={style.sideMargin}/>
                                            <Button
                                                onClick={() => this.handleChangeStatus(myOrder.order_id, myOrder.user_id, 2)}
                                                size="small" variant="contained">Confirm</Button>
                                            <span style={style.sideMargin}/>
                                            <Button
                                                onClick={() => this.handleChangeStatus(myOrder.order_id, myOrder.user_id, 4)}
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
        )
    };
}


export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(MyOrder)