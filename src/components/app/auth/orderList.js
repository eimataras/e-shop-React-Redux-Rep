import React from "react";
import {Container, ListItemText} from "@material-ui/core";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

const style = {
    sideMargin: {
        marginLeft: 5,
        marginRight: 5
    }
};

const OrderList = (props) => {
    return (
        <Grid item sm>
            {props.myOrders.map((order) => {

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

                                        <div>Order status: <span style={{fontWeight: "bold"}}>{order.type}</span>
                                            <br/>Order ID: {order.order_id}
                                            <div style={{color: "red"}}> Change status to:
                                                <span style={style.sideMargin}/>
                                                <Button onClick={() =>
                                                    props.handleChangeStatus(order.order_id, order.user_id, 3)
                                                } size="small" variant="contained">Sent</Button>
                                                <span style={style.sideMargin}/>
                                                <Button onClick={() =>
                                                    props.handleChangeStatus(order.order_id, order.user_id, 4)
                                                } size="small" variant="contained">Canceled</Button>
                                                <span style={style.sideMargin}/>
                                            </div>
                                        </div>
                                    </Grid>
                                    <IconButton
                                        onClick={() => props.handleDeleteOrder(order.order_id)}>
                                        <Icon className="material-icons" color="secondary"
                                              fontSize="large">delete_forever</Icon>
                                    </IconButton>
                                </ListItem>
                            </Paper>
                        </List>
                    </Container>
                )
            })}
        </Grid>
    )
};

export default OrderList