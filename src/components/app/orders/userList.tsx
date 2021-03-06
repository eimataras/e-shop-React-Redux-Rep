import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { fetchUser } from '../../model/actions/user-actions';
import { fetchOrder } from '../../model/actions/order-actions';
import UserDetails from './userDetails';
import OrderList from './orderList';
import { Order, OrderState } from '../../model/dataTypes/OrderState';
import { User, UserRole, UserState } from '../../model/dataTypes/UserState';
import { CurrentUserState } from '../../model/dataTypes/CurrentUserState';
import AccessDenied from '../auth/accessDenied';
import Spinner from '../layout/spinner';

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    user: state.user,
    order: state.order,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchUser: () => fetchUser(),
    fetchOrder: () => fetchOrder(),
}, dispatch);

interface UserListProps extends RouteComponentProps {
    currentUser: CurrentUserState;
    user: UserState;
    order: OrderState;
    fetchUser: () => void;
    fetchOrder: () => void;
}

interface UserListState {
}

class UserList extends Component<UserListProps, UserListState> {
    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchOrder();
    }

    render() {
        const { isAuthenticated } = this.props.currentUser;
        const { isFetching } = this.props.user;
        const users: User[] = this.props.user.data;
        const orders: Order[] = this.props.order.data;


        if (!isAuthenticated) {
            return (<AccessDenied/>);
        }

        return (isFetching) ? (
            <div className='center'>
                <h1>User list</h1>
                <Spinner/>
            </div>
        ) : (
            <div className='center'>
                <h1>User list</h1>
                <h5> Select a user to see his orders history</h5>
                <Grid container>
                    <Grid item sm>
                        {users.map((user) => {
                            // Surandu roles irasa (irasas tik vienas), kuriame yra reikiamas user_id
                            const myRole: UserRole | undefined = user.roles.find((role) => role.userId === user.userId);
                            if (!myRole) {
                                return null;
                            }
                            const passwordLength: number = user.password.length;
                            let hiddenPassword: string | undefined;
                            if (passwordLength > 30) {
                                hiddenPassword = '*****';
                            }
                            return (<UserDetails key={user.userId} user={user} myRole={myRole} hiddenPassword={hiddenPassword}/>);
                        })}
                    </Grid>
                    <OrderList orders={orders}/>
                </Grid>
            </div>
        );
    }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(UserList) as React.ComponentType<UserListProps>;
