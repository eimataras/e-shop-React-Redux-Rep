import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { green } from '@material-ui/core/colors';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Grid from '@material-ui/core/Grid';
import { fetchOrder } from '../../model/actions/order-actions';
import { Order, OrderState } from '../../model/dataTypes/OrderState';
import { CurrentUserRole, CurrentUserState } from '../../model/dataTypes/CurrentUserState';
import AccessDenied from '../auth/accessDenied';
import Spinner from '../layout/spinner';

const mapStateToProps = (state) => ({
    order: state.order,
    currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchOrder: () => fetchOrder(),
}, dispatch);

interface MyOrderHistoryProps extends RouteComponentProps {
    order: OrderState;
    currentUser: CurrentUserState;
    fetchOrder: () => void;
}

interface MyOrderHistoryState {
}

class MyOrderHistory extends Component<MyOrderHistoryProps, MyOrderHistoryState> {
    componentDidMount() {
        this.props.fetchOrder();
    }

    render() {
        const { isAuthenticated } = this.props.currentUser;
        const { isFetching } = this.props.order;
        const currentUserInfo: CurrentUserRole | undefined = isAuthenticated && this.props.currentUser?.data?.roles ? (
            this.props.currentUser.data.roles.find((info) => info)
        ) : undefined;
        const loginUserId: number | undefined = currentUserInfo ? (currentUserInfo.userId) : undefined;
        const orders: Order[] = this.props.order.data;
        const myOrders: Order[] = orders.filter((order) => (order.userId === loginUserId ? order : null));

        if (!isAuthenticated) {
            return (<AccessDenied/>);
        }

        return (
            (isFetching) ? (
                <div className='center'>
                    <h1>My orders history</h1>
                    <Spinner/>
                </div>
            ) : (
                <div>
                    <h1>Orders history</h1>
                    {myOrders.map((order) => (
                        <Container fixed maxWidth="md" key={order.orderId}>
                            <List>
                                <Paper>
                                    <ListItem>
                                        <Grid container spacing={0}>
                                            <div>
                                                Buyer:{' '}{order.name}{' '}{order.surname}<br/>
                                                Order ID:{' '}{order.orderId}<br/>
                                                Order status:{' '}{order.type}<br/>
                                                Ordered items:
                                            </div>
                                            <div>
                                                <br/><br/><br/>
                                                {order.items.map((item) => (
                                                    <Container
                                                        fixed maxWidth="sm"
                                                        key={item.orderItemId}
                                                    >
                                                        <List>
                                                            <Paper>
                                                                <ListItem>
                                                                    <MenuBookIcon
                                                                        fontSize="large"
                                                                        style={{
                                                                            color: green[500],
                                                                            padding: 30,
                                                                        }}
                                                                    />
                                                                    &quot;{item.title}&quot;{' '}{item.author}<br/>
                                                                    Published in{' '}{item.publishedDate}<br/>
                                                                    Ordered quantity:{' '}{item.quantity}
                                                                </ListItem>
                                                            </Paper>
                                                        </List>
                                                    </Container>
                                                ))}
                                            </div>
                                        </Grid>
                                    </ListItem>
                                </Paper>
                            </List>
                        </Container>
                    ))}
                </div>
            )
        );
    }
}


export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(MyOrderHistory) as React.ComponentType<MyOrderHistoryProps>;
