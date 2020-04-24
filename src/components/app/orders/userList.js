import React, {Component} from "react";
import {bindActionCreators, compose} from "redux";
import {fetchUser} from "../../model/actions/user-actions";
import {fetchOrder} from "../../model/actions/order-actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import UserDetails from "./userDetails";
import OrderList from "./orderList";
import Link from "@material-ui/core/Link";

const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchUser: () => fetchUser(),
    fetchOrder: () => fetchOrder(),
}, dispatch);


class UserList extends Component {
    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchOrder();
    }

    render() {
        const users = this.props.user.data;
        const orders = this.props.order.data;
        const fetchUserErrorMessage = users.message;
        const fetchOrderErrorMessage = orders.message;

        return (((!users.length) && (!fetchUserErrorMessage)) ? (
                <div align="center">
                    <h1>User list</h1>
                    <h3>Loading...</h3>
                </div>
            ) : ((fetchUserErrorMessage === "Access Denied") || (fetchOrderErrorMessage === "Access Denied")) ?
                (<div align="center">
                    <h1>User list</h1>
                    <h3>{fetchUserErrorMessage}... Please <span> </span>
                        <Link component="button" onClick={() => this.props.history.push('/signin')}>
                            <h3>log in</h3>
                        </Link>
                    </h3>
                    {localStorage.removeItem('jwtToken')}
                </div>)
                : (<div align="center">
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
                            <OrderList orders={orders}/>
                        </Grid>
                    </div>
                )
        )
    }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(UserList);
