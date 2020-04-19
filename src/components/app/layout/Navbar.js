import React, {useEffect} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SingedOutLinks";
import {connect} from "react-redux";
import { saveCurrentUser, setCurrentUserToDefault} from "../../model/actions/login-action";
import * as jwt from "jsonwebtoken";
import {bindActionCreators} from "redux";


const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    saveCurrentUser: (currentUser) => saveCurrentUser(currentUser),
    setCurrentUserToDefault: () => setCurrentUserToDefault()
}, dispatch);


const Navbar = (props) => {

    useEffect(() => {
        console.log("Navbar useEffect");
        if (localStorage.jwtToken) {
            console.log("Navbar useEffect saveCurrentUser");
            props.saveCurrentUser(jwt.decode(localStorage.jwtToken));
        } else {
            console.log("Navbar useEffect setCurrentUserToDefault")
            props.setCurrentUserToDefault();
        }
    }, []);

    const {isAuthenticated} = props.currentUser;

    // Refreshinant puslapi is naujo uzsetinam Redux receiveCurrentUser paeme token is LocalStore
    // if ((localStorage.jwtToken) && (!isAuthenticated)) {
    //     console.log("Is naujo uzsettinam currentUser")
    //     props.postCurrentUser(jwt.decode(localStorage.jwtToken))
    // }

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