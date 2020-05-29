import React from 'react';
import {Container, ListItemText} from '@material-ui/core';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {deleteOrder, updateOrderStatus} from '../../model/actions/order-actions';
import {Order} from "../../model/dataTypes/OrderState";

const style = {
    sideMargin: {
        marginLeft: 5,
        marginRight: 5,
    },
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateOrderStatus: (order_id, user_id, status_id) => updateOrderStatus(order_id, user_id, status_id),
    deleteOrder: (order_id) => deleteOrder(order_id),
}, dispatch);

interface MatchParams {
    userId: string;
}

interface OrderListProps extends RouteComponentProps<MatchParams> {
    updateOrderStatus: (order_id: number, user_id: number, status_id: number) => void;
    deleteOrder: (order_id: number) => void;
    userId: any;
}

interface PassedProps {
    orders: Order[];
}

type Props = OrderListProps & PassedProps;

const OrderList: React.FC<Props> = (props) => {
    const handleChangeStatus = (order_id, user_id, status_id) => {
        props.updateOrderStatus(order_id, user_id, status_id);
    };

    const handleDeleteOrder = (order_id) => {
        props.deleteOrder(order_id);
    };

    const {orders} = props;
    const id: number = Number(props.match.params.userId);
    const myOrders: Order[] | undefined = orders.filter((order) => order.user_id === id);

    return (
        <Grid item sm>
            {myOrders.map((order) => (
                <Container fixed maxWidth="sm" key={order.order_id}>
                    <List>
                        <Paper>
                            <ListItem>
                                <Grid container spacing={0}>
                                    <div>
                                        Buyer:{' '}{order.name}{' '}{order.surname}
                                    </div>
                                    <div>
                                        {order.items.map((item) => (
                                            <ul key={item.order_item_id}>
                                                <ListItem>
                                                    <ListItemText
                                                        secondary={(
                                                            <>"{item.title}"{' '}{item.author}<br/>
                                                                Quantity:{' '}{item.quantity}{' '}</>)}
                                                    />
                                                </ListItem>
                                            </ul>
                                        ))}
                                    </div>
                                    <div>
                                        Order status:{' '}
                                        <span style={{fontWeight: 'bold'}}>{order.type}</span>
                                        <br/>
                                        Order ID:{' '}{order.order_id}
                                        <div style={{color: 'red'}}>
                                            Change status to:
                                            <span style={style.sideMargin}/>
                                            <Button
                                                onClick={() => handleChangeStatus(order.order_id, order.user_id, 3)}
                                                size="small"
                                                variant="contained"
                                            >
                                                Sent
                                            </Button>
                                            <span style={style.sideMargin}/>
                                            <Button
                                                onClick={() => handleChangeStatus(order.order_id, order.user_id, 4)}
                                                size="small"
                                                variant="contained"
                                            >
                                                Canceled
                                            </Button>
                                            <span style={style.sideMargin}/>
                                        </div>
                                    </div>
                                </Grid>
                                <IconButton
                                    onClick={() => handleDeleteOrder(order.order_id)}
                                >
                                    <Icon
                                        className="material-icons"
                                        color="secondary"
                                        fontSize="large"
                                    >
                                        delete_forever
                                    </Icon>
                                </IconButton>
                            </ListItem>
                        </Paper>
                    </List>
                </Container>
            ))}
        </Grid>
    );
};

export default compose(withRouter, connect(undefined, mapDispatchToProps))(OrderList) as React.ComponentType<PassedProps>;
