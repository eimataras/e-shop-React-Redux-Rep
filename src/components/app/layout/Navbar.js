import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SingedOutLinks";
import {connect} from "react-redux";
import {postCurrentUser} from "../../model/actions/login-action";
import * as jwt from "jsonwebtoken";
import {bindActionCreators} from "redux";


const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    postCurrentUser: (currentUser) => postCurrentUser(currentUser),
}, dispatch);


class Navbar extends Component {

    render() {
        const {isAuthenticated} = this.props.currentUser;

        // Refreshinant puslapi is naujo uzsetinam Redux receiveCurrentUser paeme token is LocalStore
        if ((localStorage.jwtToken) && (!isAuthenticated)) {
            this.props.postCurrentUser(jwt.decode(localStorage.jwtToken))
        }

        const currentUserInfo = isAuthenticated ? (
            this.props.currentUser.data.roles.length ? (
                this.props.currentUser.data.roles.find(info => {
                    return info
                })
            ) : undefined) : ('');
        const loginUserRole = currentUserInfo.role_name;

        return (
            <AppBar position="static" style={{backgroundColor: 'darkred'}}>
                <Toolbar>
                    <Typography variant="h5" style={{flexGrow: 1, padding: 5}}>Book shop</Typography>
                    {isAuthenticated ? (<SignedInLinks loginUserRole={loginUserRole}/>
                    ) : (<SignedOutLinks/>
                    )}
                </Toolbar>
            </AppBar>
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);