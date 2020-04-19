import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {saveCurrentUser} from "../../model/actions/login-action";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    saveCurrentUser: () => saveCurrentUser()
}, dispatch);


const SignedInLinks = (props) => {
    const classes = useStyles();
    const {isAuthenticated} = props.currentUser;
    const currentUserInfo = isAuthenticated ? (
        props.currentUser.data.roles.length ? (
            props.currentUser.data.roles.find(info => {
                return info
            })
        ) : undefined) : ('');
    const loginUserRole = currentUserInfo.role_name;
    const nameFirstLetter = props.currentUser.data.NameFirstLetter;
    const surnameFirstLetter = props.currentUser.data.SurnameFirstLetter;

    const handleLogout = (e) => {
        // e.preventDefault();
        localStorage.removeItem('jwtToken');
        props.saveCurrentUser();
        props.history.push('/');
    };

    if (loginUserRole === "ADMIN") {
        return (
            <Toolbar>
                <Button color="inherit" onClick={() => props.history.push(`/`)}>Home</Button>
                <Button color="inherit" onClick={() => props.history.push(`/myOrder`)}>My Order</Button>
                <Button color="inherit" onClick={() => props.history.push(`/myOrderHistory`)}>My Orders
                    History</Button>
                <Button color="inherit" onClick={() => props.history.push('/addbook')}>Add New Book</Button>
                <Button color="inherit" onClick={() => props.history.push('/signup')}>Add New User</Button>
                <Button color="inherit" onClick={() => props.history.push('/userlist')}>Users</Button>
                <Button color="inherit" type="submit" onClick={handleLogout}>Sign Out</Button>

                <div className={classes.root}>
                    <Avatar style={{backgroundColor: 'grey'}}
                            className={classes.root}>{nameFirstLetter}{surnameFirstLetter}</Avatar>
                </div>

            </Toolbar>
        )
    } else if (loginUserRole === "CLIENT") {
        return (
            <Toolbar>
                <Button color="inherit" onClick={() => props.history.push(`/`)}>Home</Button>
                <Button color="inherit" onClick={() => props.history.push(`/myOrder`)}>My Order</Button>
                <Button color="inherit" onClick={() => props.history.push(`/myOrderHistory`)}>My Orders
                    History</Button>
                <Button color="inherit" type="submit" onClick={handleLogout}>Sign Out</Button>

                <div className={classes.root}>
                    <Avatar className={classes.root}>{nameFirstLetter}{surnameFirstLetter}</Avatar>
                </div>
            </Toolbar>
        )
    }
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(SignedInLinks)