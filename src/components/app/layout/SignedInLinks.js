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

    return (
        <Toolbar>
            <Button color="inherit" onClick={()=>props.history.push('/')}>Home</Button>
            <Button color="inherit" onClick={()=>props.history.push('/')}>Sign Out</Button>
            <Button color="inherit" onClick={()=>props.history.push('/myOrder/1')}>My Order</Button>
            <Button color="inherit" onClick={()=>props.history.push('/')}>My Orders History</Button>
            <Button color="inherit" onClick={()=>props.history.push('/addbook')}>Add New Book</Button>
            <Button color="inherit" onClick={()=>props.history.push('/userlist')}>Users</Button>

            <div className={classes.root}>
                <Avatar className={classes.root}>ET</Avatar>
            </div>

        </Toolbar>
    )
};

export default withRouter(SignedInLinks);