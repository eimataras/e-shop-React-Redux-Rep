import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {postLogin} from "../../model/actions/login-action";

const mapStateToProps = (state) => {
    return {
        logInUser: state.logInId
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    postLogin: (username, password) => postLogin(username, password),
}, dispatch);

class SignIn extends Component {
    state = {
        username: '',
        password: '',
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.postLogin(this.state.username, this.state.password);
    };

    render() {
        return (
            <Container fixed maxWidth="xs">
                <Paper className="padding">
                    <div align="center">
                        <form autoComplete="off">
                            <h1>Log In:</h1>
                            <TextField id="username" type="username" variant="outlined" label="Username"
                                       value={this.state.username} onChange={this.handleChange}/>
                            <TextField id="password" type="password" variant="outlined" label="Password"
                                       value={this.state.password} onChange={this.handleChange}/>
                        </form>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>Login</Button>
                    </div>
                </Paper>
            </Container>
        )
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(SignIn);