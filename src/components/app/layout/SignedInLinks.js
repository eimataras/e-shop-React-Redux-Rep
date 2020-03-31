import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));

const SignedInLinks = (props) => {
    const classes = useStyles();
    const loginUserId = props.loginUserId;

    return (
        <Toolbar>
            <Button color="inherit" onClick={() => props.history.push(`/myHomePage/${loginUserId}`)}>Home</Button>
            <Button color="inherit" onClick={() => props.history.push(`/myOrder/${loginUserId}`)}>My Order</Button>
            <Button color="inherit" onClick={() => props.history.push(`/myOrderHistory/${loginUserId}`)}>My Orders
                History</Button>
            <Button color="inherit" onClick={() => props.history.push('/addbook')}>Add New Book</Button>
            <Button color="inherit" onClick={() => props.history.push('/userlist')}>Users</Button>
            <form action="/logout" method="post">
                <Button color="inherit" type="submit" onClick={() => props.history.push('/')}>Sign Out</Button>
            </form>

            <div className={classes.root}>
                <Avatar className={classes.root}>ET</Avatar>
            </div>

        </Toolbar>
    )
};

export default withRouter(SignedInLinks);