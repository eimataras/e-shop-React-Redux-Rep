import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {addAdmin, addClient} from "../../model/actions/user-actions";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";


const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
};


const mapDispatchToProps = (dispatch) => bindActionCreators({
    addClient: (user) => addClient(user),
    addAdmin: (user) => addAdmin(user)
}, dispatch);


class SignUp extends Component {
    state = {
        name: '',
        surname: '',
        username: '',
        password: '',
    };


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmitClient = () => {
        console.log(this.state);
        const user = this.state;
        this.props.addClient(user);
        this.setState({
            name: '',
            surname: '',
            username: '',
            password: '',
        })
    };

    handleSubmitAdmin = () => {
        console.log(this.state);
        const user = this.state;
        this.props.addAdmin(user);
        this.setState({
            name: '',
            surname: '',
            username: '',
            password: '',
        })
    };

    render() {
        const {isAuthenticated} = this.props.currentUser;
        const currentUserInfo = isAuthenticated ? (
            this.props.currentUser.data.roles.length ? (
                this.props.currentUser.data.roles.find(info => {
                    return info
                })
            ) : undefined) : ('');
        const loginUserRole = currentUserInfo.role_name;

        if (loginUserRole === "ADMIN") {

            return (
                <Container fixed maxWidth="xs">
                    <Paper className="padding">
                        <div align="center">
                            <form autoComplete="off">
                                <h1>Sign Up:</h1>
                                <TextField id="name" type="name" variant="outlined" label="First name"
                                           value={this.state.name} onChange={this.handleChange}/>
                                <TextField id="surname" type="surname" variant="outlined" label="Last name"
                                           value={this.state.surname} onChange={this.handleChange}/>
                                <TextField id="username" type="username" variant="outlined" label="Username"
                                           value={this.state.username} onChange={this.handleChange}/>
                                <TextField id="password" type="password" variant="outlined" label="Password"
                                           value={this.state.password} onChange={this.handleChange}/>
                            </form>
                            <Button variant="contained" color="primary" onClick={this.handleSubmitClient}>Create
                                Client</Button>
                            <span> </span>
                            <Button variant="contained" color="secondary" onClick={this.handleSubmitAdmin}>Create
                                Admin</Button>
                        </div>
                    </Paper>
                </Container>
            )
        } else {
            return (
                <Container fixed maxWidth="xs">
                    <Paper className="padding">
                        <div align="center">
                            <form autoComplete="off">
                                <h1>Sign Up:</h1>
                                <TextField id="name" type="name" variant="outlined" label="First name"
                                           value={this.state.name} onChange={this.handleChange}/>
                                <TextField id="surname" type="surname" variant="outlined" label="Last name"
                                           value={this.state.surname} onChange={this.handleChange}/>
                                <TextField id="username" type="username" variant="outlined" label="Username"
                                           value={this.state.username} onChange={this.handleChange}/>
                                <TextField id="password" type="password" variant="outlined" label="Password"
                                           value={this.state.password} onChange={this.handleChange}/>
                            </form>
                            <Button variant="contained" color="primary" onClick={this.handleSubmitClient}>Sign
                                up</Button>
                        </div>
                    </Paper>
                </Container>
            )
        }
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))(SignUp)