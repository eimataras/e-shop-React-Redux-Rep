import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SingedOutLinks";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    };
};

class Navbar extends Component {
    render() {

        const {isAuthenticated} = this.props.currentUser;
        const currentUserInfo = isAuthenticated? (
            this.props.currentUser.data.roles.length? (
                this.props.currentUser.data.roles.find(info => {
                    return info
                })
        ) : undefined ) : ('');

        console.log("isAuthenticated: ");
        console.log(isAuthenticated);
        console.log("currentUserInfo: ");
        console.log(currentUserInfo);

        // const currentUser = localStorage.jwtToken ? (jwt.decode(localStorage.jwtToken)) : false;
        // console.log(currentUser);
        // const currentUserInfo = currentUser ? (
        //     currentUser.roles.length ? (
        //         currentUser.roles.find(info => {
        //             return info
        //         })
        //     ) : undefined
        // ) : ('');
        // console.log(currentUserInfo);

        const loginUserId = currentUserInfo.user_id;
        const loginUserRole = currentUserInfo.role_name;

        return (
            <AppBar position="static" style={{backgroundColor: 'darkred'}}>
                <Toolbar>
                    <Typography variant="h5" style={{flexGrow: 1, padding: 5}}>Book shop</Typography>
                    {isAuthenticated ? (<SignedInLinks loginUserId={loginUserId} loginUserRole={loginUserRole}/>
                    ) : (<SignedOutLinks/>
                    )}
                </Toolbar>
            </AppBar>
        )
    };
}

export default connect(mapStateToProps, undefined)(Navbar);