import React, {useEffect, useRef} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import * as jwt from 'jsonwebtoken';
import {bindActionCreators, compose} from 'redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {saveCurrentUser} from '../../model/actions/login-action';
import SignedOutLinks from './SingedOutLinks';
import SignedInLinks from './SignedInLinks';
import {CurrentUser, CurrentUserRole, CurrentUserState} from "../../model/dataTypes/CurrentUserState";


const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    saveCurrentUser: (currentUser) => saveCurrentUser(currentUser),
}, dispatch);

interface NavBarProps extends RouteComponentProps {
    currentUser: CurrentUserState;
    saveCurrentUser: (currentUser: CurrentUser) => void;
}

interface UseRefProps {
    current: boolean;
}

interface PassedProps {
}

type Props = NavBarProps & UseRefProps & PassedProps;

const Navbar: React.FC<Props> = (props) => {
    const didRun: UseRefProps = useRef<boolean>(false);

    useEffect(() => {
        if (!didRun.current) {
            if (localStorage.jwtToken && localStorage.firebaseToken) {
                props.saveCurrentUser(jwt.decode(localStorage.jwtToken));
            }
            didRun.current = true;
        }
    });

    const {isAuthenticated} = props.currentUser;
    const currentUserInfo: CurrentUserRole[] | undefined = isAuthenticated ? (props.currentUser.data.roles) : undefined;
    return (
        <AppBar position="static" style={{backgroundColor: 'darkred'}}>
            <Toolbar>
                <Button
                    style={{flexGrow: 1, textAlign: 'left'}}
                    color="inherit"
                    onClick={() => props.history.push('/')}
                >
                    <Typography variant="h5" style={{flexGrow: 1, padding: 5}}>Book shop</Typography>
                </Button>
                {(isAuthenticated && currentUserInfo) ? (<SignedInLinks/>) : (<SignedOutLinks/>)}
            </Toolbar>
        </AppBar>
    );
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Navbar) as React.ComponentType<PassedProps>;
