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
    const loginUserRole = props.loginUserRole;

    const handleLogout = (e) => {
        // e.preventDefault();
        localStorage.removeItem('jwtToken');
        props.history.push('/');
        window.location.reload();
    };

    if (loginUserRole === "ADMIN") {
        return (
            <Toolbar>
                <Button color="inherit" onClick={() => props.history.push(`/`)}>Home</Button>
                <Button color="inherit" onClick={() => props.history.push(`/myOrder`)}>My Order</Button>
                <Button color="inherit" onClick={() => props.history.push(`/myOrderHistory`)}>My Orders
                    History</Button>
                <Button color="inherit" onClick={() => props.history.push('/addbook')}>Add New Book</Button>
                <Button color="inherit" onClick={() => props.history.push('/userlist')}>Users</Button>
                <Button color="inherit" type="submit" onClick={handleLogout}>Sign Out</Button>

                <div className={classes.root}>
                    <Avatar style={{backgroundColor: 'grey'}} className={classes.root}>{props.NameFirstLetter}{props.SurnameFirstLetter}</Avatar>
                </div>

            </Toolbar>
        )
    } else {
        return (
            <Toolbar>
                <Button color="inherit" onClick={() => props.history.push(`/`)}>Home</Button>
                <Button color="inherit" onClick={() => props.history.push(`/myOrder`)}>My Order</Button>
                <Button color="inherit" onClick={() => props.history.push(`/myOrderHistory`)}>My Orders
                    History</Button>
                <Button color="inherit" type="submit" onClick={handleLogout}>Sign Out</Button>

                <div className={classes.root}>
                    <Avatar className={classes.root}>{props.NameFirstLetter}{props.SurnameFirstLetter}</Avatar>
                </div>
            </Toolbar>
        )
    }
};

export default withRouter(SignedInLinks);