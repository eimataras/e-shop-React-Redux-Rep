import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {saveCurrentUser} from "../../model/actions/login-action";
import AdminLinks from "./adminLinks";
import ClientLinks from "./clientLinks";


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
        return (<AdminLinks handleLogout={handleLogout} nameFirstLetter={nameFirstLetter}
                            surnameFirstLetter={surnameFirstLetter}/>)
    } else if (loginUserRole === "CLIENT") {
        return (<ClientLinks handleLogout={handleLogout} nameFirstLetter={nameFirstLetter}
                             surnameFirstLetter={surnameFirstLetter}/>)
    }
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(SignedInLinks)