import React from 'react';
import { Container, ListItemText } from '@material-ui/core';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { deleteOrder, updateOrderStatus } from '../../model/actions/order-actions';
import { Order } from '../../model/dataTypes/OrderState';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateOrderStatus: (orderId, userId, statusId) => updateOrderStatus(orderId, userId, statusId),
    deleteOrder: (orderId) => deleteOrder(orderId),
}, dispatch);

interface MatchParams {
    userId: string;
}

interface OrderListProps extends RouteComponentProps<MatchParams> {
    updateOrderStatus: (orderId: number, userId: number, statusId: number) => void;
    deleteOrder: (orderId: number) => void;
    userId: any;
}

interface PassedProps {
    orders: Order[];
}

type Props = OrderListProps & PassedProps;

const OrderList: React.FC<Props> = (props) => {
    const handleChangeStatus = (orderId, userId, statusId) => {
        props.updateOrderStatus(orderId, userId, statusId);
    };

    const handleDeleteOrder = (orderId) => {
        props.deleteOrder(orderId);
    };
    const { orders } = props;
    const id: number = Number(props.match.params.userId);
    const myOrders: Order[] | undefined = orders.filter((order) => order.userId === id);

    return (
        <Grid item sm>
            {myOrders.map((order) => (
                <Container fixed maxWidth="sm" key={order.orderId}>
                    <List>
                        <Paper>
                            <ListItem>
                                <Grid container spacing={0}>
                                    <div>
                                        Buyer:{' '}{order.name}{' '}{order.surname}
                                    </div>
                                    <div>
                                        {order.items.map((item) => (
                                            <ul key={item.orderItemId}>
                                                <ListItem>
                                                    <ListItemText
                                                        secondary={(
                                                            <>&quot;{item.title}&quot;{' '}{item.author}<br/>
                                                                Quantity:{' '}{item.quantity}{' '}</>)}
                                                    />
                                                </ListItem>
                                            </ul>
                                        ))}
                                    </div>
                                    <div>
                                        Order status:{' '}
                                        <span style={{ fontWeight: 'bold' }}>{order.type}</span>
                                        <br/>
                                        Order ID:{' '}{order.orderId}
                                        <div style={{ color: 'red' }}>
                                            Change status to:
                                            <span className='sideMargin'/>
                                            <Button
                                                onClick={() => handleChangeStatus(order.orderId, order.userId, 3)}
                                                size="small"
                                                variant="contained"
                                            >
                                                Sent
                                            </Button>
                                            <span className='sideMargin'/>
                                            <Button
                                                onClick={() => handleChangeStatus(order.orderId, order.userId, 4)}
                                                size="small"
                                                variant="contained"
                                            >
                                                Canceled
                                            </Button>
                                            <span className='sideMargin'/>
                                        </div>
                                    </div>
                                </Grid>
                                <IconButton
                                    onClick={() => handleDeleteOrder(order.orderId)}
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
