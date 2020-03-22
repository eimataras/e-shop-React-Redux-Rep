import React, {Component} from "react";
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchOrder} from "../../model/actions/order-actions";
import Paper from "@material-ui/core/Paper";
import {Container} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {green} from "@material-ui/core/colors";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Grid from "@material-ui/core/Grid";

const mapStateToProps = (state) => {
    return {
        order: state.order
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchOrder: () => fetchOrder(),
}, dispatch);

class MyOrderHistory extends Component {
    componentDidMount() {
        this.props.fetchOrder();
    }

    render() {
        const loginUserId = Number(this.props.match.params.userId);
        const orders = this.props.order.data;
        const myOrders = orders.filter((order) => order.user_id === loginUserId ? order : null);

        return (
            <div align="center">
                <h1>Orders history</h1>
                {myOrders.map(order => {
                    return (
                        <Container fixed maxWidth="md" key={order.order_id}>
                            <List>
                                <Paper>
                                    <ListItem>
                                        <Grid container spacing={0}>
                                            <div>
                                                Buyer: {order.name} {order.surname}<br/>Order
                                                ID: {order.order_id}<br/>Order status: {order.type}<br/>Ordered
                                                items:
                                            </div>
                                            <div>
                                                <br/><br/><br/>
                                                {order.items.map(item => {
                                                    return (
                                                        <Container fixed maxWidth="sm"
                                                                   key={item.order_item_id}>
                                                            <List>
                                                                <Paper>
                                                                    <ListItem>
                                                                        <MenuBookIcon fontSize="large"
                                                                                      style={{
                                                                                          color: green[500],
                                                                                          padding: 30
                                                                                      }}/>
                                                                        "{item.title}" {item.author}<br/>
                                                                        Published
                                                                        in {item.published_date}<br/>
                                                                        Ordered quantity: {item.quantity}
                                                                    </ListItem>
                                                                </Paper>
                                                            </List>
                                                        </Container>
                                                    )
                                                })}
                                            </div>
                                        </Grid>
                                    </ListItem>
                                </Paper>
                            </List>
                        </Container>
                    )
                })}
            </div>
        )
    }
}


export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(MyOrderHistory)