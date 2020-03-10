import React, {Component} from "react";
import {bindActionCreators, compose} from "redux";
import {deleteUser, fetchUser} from "../../model/actions/user-actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Container, ListItemText} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import {deleteOrder, fetchOrder, updateOrder} from "../../model/actions/order-actions";
import Button from "@material-ui/core/Button";


const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchUser: () => fetchUser(),
    deleteUser: (id) => deleteUser(id),
    fetchOrder: () => fetchOrder(),
    updateOrder: (order_id, user_id, status_id) => updateOrder(order_id, user_id, status_id),
    deleteOrder: (order_id) => deleteOrder(order_id),

}, dispatch);


class UserList extends Component {

    state = {};

    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchOrder();
    }

    handleSubmit = (id) => {
        this.props.deleteUser(id);
    };

    handleSelectedUserOrders = (id) => {
        this.props.history.push(`/userlist/${id}`);
    };

    handleChangeStatus = (order_id, user_id, status_id) => {
        this.props.updateOrder(order_id, user_id, status_id);
    };

    handleDeleteOrder = (order_id) => {
      this.props.deleteOrder(order_id);
    };


    render() {
        const items = this.props.user.data;
        const orders = this.props.order.data;
        const id = Number(this.props.match.params.userId);
        const myOrders = orders.filter((order) => {
            return order.user_id === id
        });

        if (!items.length) {
            return (<h1>Loading</h1>);
        }


        return (
            <div align="center">
                <h1>Users list</h1>
                <Grid container>
                    <Grid item sm>
                        {items.map((item) => {

                            // Surandu roles irasa (irasas tik vienas), kuriame yra reikiamas user_id
                            const myRole = item.roles.find(role => {
                                return role.user_id === item.user_id
                            });

                            if (!myRole) {
                                return null;
                            }
                            return (
                                <Container fixed maxWidth="xs" key={item.user_id}>
                                    <List>
                                        <Paper>
                                            <ListItem button
                                                      onClick={() => this.handleSelectedUserOrders(item.user_id)}>
                                                <Grid container spacing={0}>
                                                    <ListItemText primary={(<>{item.name} {item.surname}</>)}
                                                                  secondary={(<>Username: {item.username}<br/>Password: {item.password}<br/>Role: {myRole.role_name} </>)}/>
                                                    <IconButton onClick={() => this.handleSubmit(item.user_id)}>
                                                        <Icon className="material-icons" color="secondary"
                                                              fontSize="large">delete_forever</Icon>
                                                    </IconButton>
                                                </Grid>
                                            </ListItem>
                                        </Paper>
                                    </List>
                                </Container>
                            )
                        })
                        }
                    </Grid>
                    <Grid item sm>
                        <h5> Click on specific user to see his orders </h5>
                        {myOrders.map((order) => {

                            return (
                                <Container fixed maxWidth="sm" key={order.order_id}>
                                    <List>
                                        <Paper>
                                            <ListItem>
                                                <Grid container spacing={0}>
                                                    <div>Buyer: {order.name} {order.surname}</div>
                                                    <div>
                                                        {order.items.map((item) => {
                                                            return (
                                                                <ul key={item.order_item_id}>
                                                                    <ListItem>
                                                                        <ListItemText
                                                                            secondary={(
                                                                                <span>"{item.title}" {item.author}<br/>Quantity: {item.quantity} </span>)}/>
                                                                    </ListItem>
                                                                </ul>
                                                            )
                                                        })}
                                                    </div>
                                                    <div>Order status: {order.type}
                                                        <br/>Order ID: {order.order_id}
                                                        <div className="redtext"> Change status to:
                                                            <span className="sidemargin"/>
                                                            <Button onClick={() => {
                                                                this.handleChangeStatus(order.order_id, order.user_id, 3)
                                                            }} size="small" variant="contained">Sent</Button>
                                                            <span className="sidemargin"/>
                                                            <Button onClick={() => {
                                                                this.handleChangeStatus(order.order_id, order.user_id, 4)
                                                            }} size="small" variant="contained">Canceled</Button>
                                                            <span className="sidemargin"/>
                                                            <IconButton
                                                                onClick={() => this.handleDeleteOrder(order.order_id)}>
                                                                <Icon className="material-icons" color="secondary"
                                                                      fontSize="large">delete_forever</Icon>
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </ListItem>
                                        </Paper>
                                    </List>
                                </Container>
                            )
                        })}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(UserList);
