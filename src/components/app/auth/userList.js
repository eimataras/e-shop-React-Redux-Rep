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
import OrderList from "./orderList";

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
                <h1>User list</h1>
                <h5> Select a user to see his order </h5>
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
                    <OrderList
                        handleDeleteOrder={this.handleDeleteOrder}
                        handleChangeStatus={this.handleChangeStatus}
                        myOrders={myOrders}/>
                </Grid>
            </div>
        )
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(UserList);