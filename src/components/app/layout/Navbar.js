import React, {useEffect} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SingedOutLinks";
import {connect} from "react-redux";
import {saveCurrentUser} from "../../model/actions/login-action";
import * as jwt from "jsonwebtoken";
import {bindActionCreators} from "redux";


const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    saveCurrentUser: (currentUser) => saveCurrentUser(currentUser),
}, dispatch);


const Navbar = (props) => {

    useEffect(() => {
        if (localStorage.jwtToken) {
            console.log("Navbar useEffect saveCurrentUser");
            props.saveCurrentUser(jwt.decode(localStorage.jwtToken));
        } else {
            console.log("Navbar useEffect save no currentUser");
            props.saveCurrentUser();
        }
    }, []);

    const {isAuthenticated} = props.currentUser;
    return (
        <AppBar position="static" style={{backgroundColor: 'darkred'}}>
            <Toolbar>
                <Typography variant="h5" style={{flexGrow: 1, padding: 5}}>Book shop</Typography>
                {isAuthenticated ? (<SignedInLinks/>) : (<SignedOutLinks/>)}
            </Toolbar>
        </AppBar>
    )

};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);