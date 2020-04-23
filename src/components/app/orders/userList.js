import React, {Component} from "react";
import {bindActionCreators, compose} from "redux";
import {fetchUser} from "../../model/actions/user-actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {deleteOrder, fetchOrder, updateOrderStatus} from "../../model/actions/order-actions";
import OrderList from "./orderList";
import UserDetails from "./userDetails";

const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchUser: () => fetchUser(),
    fetchOrder: () => fetchOrder(),
    updateOrderStatus: (order_id, user_id, status_id) => updateOrderStatus(order_id, user_id, status_id),
    deleteOrder: (order_id) => deleteOrder(order_id),
}, dispatch);


class UserList extends Component {
    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchOrder();
    }

    handleChangeStatus = (order_id, user_id, status_id) => {
        this.props.updateOrderStatus(order_id, user_id, status_id);
    };

    handleDeleteOrder = (order_id) => {
        this.props.deleteOrder(order_id);
    };


    render() {
        const users = this.props.user.data;
        const orders = this.props.order.data;
        const id = Number(this.props.match.params.userId);
        const myOrders = orders.filter((order) => {
            return order.user_id === id
        });
        const error = this.props.user.data.error;

        if (error === "Forbidden") {
            return (<h1>Only ADMIN user can see this page</h1>)
        }

        if (!users.length) {
            return (<h1>Loading</h1>);
        }

        return (
            <div align="center">
                <h1>User list</h1>
                <h5> Select a user to see his orders history</h5>
                <Grid container>
                    <Grid item sm>
                        {users.map((user) => {
                            // Surandu roles irasa (irasas tik vienas), kuriame yra reikiamas user_id
                            const myRole = user.roles.find(role => {
                                return role.user_id === user.user_id
                            });

                            if (!myRole) {
                                return null;
                            }

                            const passwordLength = user.password.length;
                            if (passwordLength > 30) {
                                user.password = "*****";
                            }

                            return (<UserDetails key={user.user_id} user={user} myRole={myRole}/>)
                        })}
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

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(UserList);