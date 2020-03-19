import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {fetchOrder, updateOrderItemQuantity, updateOrderStatus} from "../../model/actions/order-actions";
import Grid from "@material-ui/core/Grid";
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
        order: state.order
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchOrder: () => fetchOrder(),
    updateOrderStatus: (order_id, user_id, status_id) => updateOrderStatus(order_id, user_id, status_id),
    updateOrderItemQuantity: (order_item_id, order_id, book_id, quantity) => updateOrderItemQuantity(order_item_id, order_id, book_id, quantity),
}, dispatch);


class MyOrder extends Component {

    componentDidMount() {
        this.props.fetchOrder();
    }

    handleChangeStatus = (order_id, user_id, status_id) => {
        this.props.updateOrderStatus(order_id, user_id, status_id)
    };

    handleQuantityPlus = (order_item_id, order_id, book_id, quantity) => {
        this.props.updateOrderItemQuantity(order_item_id, order_id, book_id, quantity + 1)
    };

    handleQuantityMinus = (order_item_id, order_id, book_id, quantity) => {
        this.props.updateOrderItemQuantity(order_item_id, order_id, book_id, quantity - 1)
    };

    render() {
        const loginUserId = Number(this.props.match.params.userId);
        const order = this.props.order.data;
        const myOrder = order.find((order) => {
            return order.user_id === loginUserId && order.status_id === 1
        });

        if (myOrder == null) {
            return (
                <div align='center'>
                    <h1>Your purchase basket is empty</h1>
                    <Link component="button" onClick={() => this.props.history.push('/')}><h1>Start shopping?</h1>
                    </Link>
                </div>
            )
        }


        return (
            <Grid align='center' item sm>
                <h1>My order</h1>
                <Container fixed maxWidth='sm'>
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
            </Grid>
        )
    };
}


export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(MyOrder)