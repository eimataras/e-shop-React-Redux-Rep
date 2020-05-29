import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import {saveCurrentUser} from '../../model/actions/login-action';
import AdminLinks from './adminLinks';
import ClientLinks from './clientLinks';
import {auth} from '../../../firebase';
import {CurrentUserRole, CurrentUserState} from "../../model/dataTypes/CurrentUserState";


const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    saveCurrentUser: () => saveCurrentUser(),
}, dispatch);

interface SignedInLinksProps extends RouteComponentProps {
    currentUser: CurrentUserState;
    saveCurrentUser: () => void;
}

interface PassedProps {}

type Props = SignedInLinksProps & PassedProps;

const SignedInLinks: React.FC<Props> = (props) => {
    const {isAuthenticated} = props.currentUser;
    const {nameFirstLetter} = props.currentUser.data;
    const {surnameFirstLetter} = props.currentUser.data;
    const currentUserInfo: CurrentUserRole | undefined = isAuthenticated ? (
        props.currentUser.data.roles.length ? (
            props.currentUser.data.roles.find((info) => info)
        ) : undefined) : undefined;
    const loginUserRole: string | undefined = currentUserInfo ? (currentUserInfo.role_name) : undefined;

    const handleLogout = () => {
        auth.signOut().then(() => {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('firebaseToken');
            props.saveCurrentUser();
            props.history.push('/');
        });
    };

    return (
        (loginUserRole === 'ADMIN') ? (
            <AdminLinks
                handleLogout={handleLogout}
                nameFirstLetter={nameFirstLetter}
                surnameFirstLetter={surnameFirstLetter}
            />
        ) : (loginUserRole === 'CLIENT') ? (
            <ClientLinks
                handleLogout={handleLogout}
                nameFirstLetter={nameFirstLetter}
                surnameFirstLetter={surnameFirstLetter}
            />
        ) : null
    );
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(SignedInLinks) as React.ComponentType<PassedProps>;
