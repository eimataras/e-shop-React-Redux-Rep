import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addAdmin, addClient} from "../../model/actions/user-actions";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {auth} from "../../../firebase";
import {CurrentUserState} from "../../model/dataTypes/CurrentUserState";
import {UserState} from "../../model/dataTypes/UserState";


const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        user: state.user,
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addClient: (user, uid) => addClient(user, uid),
    addAdmin: (user, uid) => addAdmin(user, uid)
}, dispatch);


interface SignUpState {
    name?: string;
    surname?: string;
    username?: string;
    password?: string;
}

interface SignUpProps {
    addClient: (user: SignUpState, uid: string | undefined) => any;
    addAdmin: (user: SignUpState, uid: string | undefined) => any;
    currentUser: CurrentUserState;
    user: UserState;
}

class SignUp extends Component<SignUpProps, SignUpState> {
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
        const user = this.state;

        auth.createUserWithEmailAndPassword(user.username, user.password).then(cred => {
            if (cred.user !== null) {
                const uid = cred.user.uid;
                // auth.signOut().then(() => {
                this.props.addClient(user, uid);
                // });
            }
        })
            .catch(() => {
                const uid = undefined;
                this.props.addClient(user, uid);
            });

        this.setState({
            name: '',
            surname: '',
            username: '',
            password: '',
        })
    };

    handleSubmitAdmin = () => {
        const user = this.state;

        auth.createUserWithEmailAndPassword(user.username, user.password)
            .then(cred => {
            if (cred.user !== null) {
                const uid = cred.user.uid;
                // auth.signOut().then(() => {
                this.props.addAdmin(user, uid);
                // });
            }
        })
            .catch(() => {
                const uid = undefined;
                this.props.addAdmin(user, uid);
            });

        this.setState({
            name: '',
            surname: '',
            username: '',
            password: '',
        })
    };

    render() {
        const {isAuthenticated} = this.props.currentUser;
        const {error} = this.props.user;
        const currentUserInfo = isAuthenticated ? (
            this.props.currentUser.data.roles.length ? (
                this.props.currentUser.data.roles.find(info => {
                    return info
                })
            ) : null) : null;

        const loginUserRole = currentUserInfo ? (currentUserInfo.role_name) : null;

        return (
            <Container fixed maxWidth="xs">
                <Paper className="padding">
                    <div className="center">
                        <form autoComplete="off">
                            <h1>Sign Up:</h1>
                            {error ? (
                                <h5 style={{color: 'red'}}>Bad request! Make sure you fill up the form
                                    correctly.</h5>) : ''}
                            <TextField id="name" type="name" variant="outlined" label="First name"
                                       value={this.state.name} onChange={this.handleChange}/>
                            <TextField id="surname" type="surname" variant="outlined" label="Last name"
                                       value={this.state.surname} onChange={this.handleChange}/>
                            <TextField id="username" type="username" variant="outlined" label="E-mail"
                                       value={this.state.username} onChange={this.handleChange}/>
                            <TextField id="password" type="password" variant="outlined" label="Password"
                                       value={this.state.password} onChange={this.handleChange}/>
                        </form>
                        {(loginUserRole === "ADMIN") ? (
                            <div>
                                <Button variant="contained" color="primary" onClick={this.handleSubmitClient}>Create
                                    Client</Button>
                                <span> </span>
                                <Button variant="contained" color="secondary" onClick={this.handleSubmitAdmin}>Create
                                    Admin</Button>
                            </div>
                        ) : (
                            <Button variant="contained" color="primary" onClick={this.handleSubmitClient}>Sign
                                up</Button>
                        )}
                    </div>
                </Paper>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
