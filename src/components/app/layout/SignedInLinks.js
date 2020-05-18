import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {saveCurrentUser} from "../../model/actions/login-action";
import AdminLinks from "./adminLinks";
import ClientLinks from "./clientLinks";
import {auth} from "../../../firebase"


const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    saveCurrentUser: () => saveCurrentUser()
}, dispatch);


const SignedInLinks = (props) => {
    const {isAuthenticated} = props.currentUser;
    const {nameFirstLetter} = props.currentUser.data;
    const {surnameFirstLetter} = props.currentUser.data;
    const currentUserInfo = isAuthenticated ? (
        props.currentUser.data.roles.length ? (
            props.currentUser.data.roles.find(info => {
                return info
            })
        ) : undefined) : ('');
    const loginUserRole = currentUserInfo.role_name;

    const handleLogout = (e) => {
        // e.preventDefault();
        auth.signOut().then(() => {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('firebaseToken');
            props.saveCurrentUser();
            props.history.push('/');
        });

    };

    return (
        (loginUserRole === "ADMIN") ?
            (<AdminLinks handleLogout={handleLogout} nameFirstLetter={nameFirstLetter}
                         surnameFirstLetter={surnameFirstLetter}/>
            ) : (loginUserRole === "CLIENT") ?
            (<ClientLinks handleLogout={handleLogout} nameFirstLetter={nameFirstLetter}
                          surnameFirstLetter={surnameFirstLetter}/>) : null
    )
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(SignedInLinks)