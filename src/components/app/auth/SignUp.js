import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {addAdmin, addClient} from "../../model/actions/user-actions";


const mapDispatchToProps = (dispatch) => bindActionCreators({
    pridekNaujaKlienta: (user) => addClient(user),
    pridekNaujaAdmina: (user) => addAdmin(user)
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
        this.props.pridekNaujaKlienta(user);
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
        this.props.pridekNaujaAdmina(user);
        this.setState({
            name: '',
            surname: '',
            username: '',
            password: '',
        })
    };

    render() {
        return (
            <div>
                <form>
                    <h2>Sign Up:</h2>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="name" id="name" value={this.state.name} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="surname">Surname: </label>
                        <input type="surname" id="surname" value={this.state.surname} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input type="username" id="username" value={this.state.username} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" value={this.state.password} onChange={this.handleChange}/>
                    </div>
                </form>
                    <div className="leftmargin">
                        <Button variant="contained" color="primary" onClick = {this.handleSubmitClient}>Create Client</Button>
                        <span> </span>
                        <Button variant="contained" color="primary" onClick = {this.handleSubmitAdmin}>Create Admin</Button>
                    </div>
            </div>
        )
    }
}

export default compose(
    withRouter,
    connect(undefined, mapDispatchToProps))(SignUp)