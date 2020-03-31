import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SingedOutLinks";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
        padding: 5
    },
    color: {
        backgroundColor: 'darkred'
    }
}));

const Navbar = () => {
    const classes = useStyles();
    const loginUserId = 25;

    return (
        <AppBar  position="static">
            <Toolbar className={classes.color}>
                <Typography variant="h5" className={classes.title}>Book shop</Typography>
                {/*{loginUserId ? (*/}
                {/*    <SignedInLinks loginUserId={loginUserId}/>*/}
                {/*) : (*/}
                {/*    <SignedOutLinks/>*/}
                {/*)}*/}

                <SignedInLinks loginUserId={loginUserId}/>
                <SignedOutLinks/>
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;