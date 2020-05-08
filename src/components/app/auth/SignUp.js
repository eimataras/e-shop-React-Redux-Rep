import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addAdmin, addClient} from "../../model/actions/user-actions";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {auth} from "../../../firebase";


const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addClient: (user, uid) => addClient(user, uid),
    addAdmin: (user, uid) => addAdmin(user, uid)
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
        const user = this.state;
        auth.createUserWithEmailAndPassword(user.username, user.password).then(cred => {
            const uid = cred.user.uid;
            console.log(uid);
            auth.signOut().then(() => {
                this.props.addClient(user, uid);
            });
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
        auth.createUserWithEmailAndPassword(user.username, user.password).then(cred => {
            const uid = cred.user.uid;
            console.log(uid);
            auth.signOut().then(() => {
                this.props.addAdmin(user, uid);
            });
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
        const currentUserInfo = isAuthenticated ? (
            this.props.currentUser.data.roles.length ? (
                this.props.currentUser.data.roles.find(info => {
                    return info
                })
            ) : undefined) : ('');
        const loginUserRole = currentUserInfo.role_name;

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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)