import React, {useEffect, useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {postLogin, saveCurrentUser} from "../../model/actions/login-action";

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    postLogin: (username, password, props) => postLogin(username, password, props),
    saveCurrentUser: (currentUser) => saveCurrentUser(currentUser),
}, dispatch);

const SignIn = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const didRun = useRef(false);

    useEffect(() => {
        if (!didRun.current) {
            console.log('useRef');
            if (!localStorage.jwtToken) {
                props.saveCurrentUser();
            }
            didRun.current = true;
        }
    },);


    const handleSubmit = (e) => {
        e.preventDefault();
        props.postLogin(username, password, props);
        setUsername('');
        setPassword('')
    };

    const handleChangeUsername = e => {
        setUsername(e.target.value)
    };

    const handleChangePassword = e => {
        setPassword(e.target.value)
    };

    return (
        <Container fixed maxWidth="xs">
            <Paper className="padding">
                <div align="center">
                    <form autoComplete="off">
                        <h1>Log In:</h1>
                        {props.currentUser.error ? (
                            <h5 style={{color: "red"}}>Wrong username or password!</h5>) : ''}
                        <TextField autoFocus id="username" name="username" type="username" variant="outlined"
                                   label="Username"
                                   value={username} onChange={handleChangeUsername}/>
                        <TextField id="password" name="password" type="password" variant="outlined"
                                   label="Password"
                                   value={password} onChange={handleChangePassword}/>
                        <br/>
                        <div>
                            <input type="checkbox" id="remember-me" name="remember-me"/>
                            <label htmlFor="remember-me">Remember me?</label>
                        </div>
                        <br/>
                        <div className="padding">
                            <Button variant="contained" color="primary" type="submit"
                                    onClick={handleSubmit}>Login</Button>
                        </div>
                    </form>
                </div>
            </Paper>
        </Container>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);