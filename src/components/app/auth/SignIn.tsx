import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { logInWithEmailAndPassword } from '../../model/actions/login-action';
import { CurrentUserState } from '../../model/dataTypes/CurrentUserState';
import Spinner from '../layout/spinner';


const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    logInWithEmailAndPassword: (email, password) => logInWithEmailAndPassword(email, password),
}, dispatch);


interface SignInProps extends RouteComponentProps<any> {
    currentUser: CurrentUserState;
    logInWithEmailAndPassword: (email: string, password: string) => void;
}

const SignIn: React.FC<SignInProps> = (props) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { isFetching } = props.currentUser;
    const { isAuthenticated } = props.currentUser;

    const handleSubmit = (e) => {
        e.preventDefault();
        props.logInWithEmailAndPassword(username, password);
        setUsername('');
        setPassword('');
    };

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    if (isFetching) {
        return (
            <Spinner/>
        );
    }

    if (isAuthenticated) {
        props.history.push('/');
    }

    return (
        <Container fixed maxWidth="xs">
            <Paper className="padding">
                <div className="center">
                    <form autoComplete="off">
                        <h1>Log In:</h1>
                        {props.currentUser.error === 'loginError' ? (
                            <h5 style={{ color: 'red' }}>Wrong username or password!</h5>) : ''}
                        <TextField
                            autoFocus
                            id="username"
                            name="username"
                            type="username"
                            variant="outlined"
                            label="Username"
                            value={username}
                            onChange={handleChangeUsername}
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            variant="outlined"
                            label="Password"
                            value={password}
                            onChange={handleChangePassword}
                        />
                        <br/>
                        <div>
                            <input type="checkbox" id="remember-me" name="remember-me"/>
                            <label htmlFor="remember-me">Remember me?</label>
                        </div>
                        <br/>
                        <div className="padding">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={handleSubmit}
                            > Login
                            </Button>
                        </div>
                    </form>
                </div>
            </Paper>
        </Container>
    );
};

export default compose<any>(withRouter, connect(mapStateToProps, mapDispatchToProps))(SignIn);
