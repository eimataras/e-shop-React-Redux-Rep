import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {addUser} from "../../model/actions/user-actions";


const mapDispatchToProps = (dispatch) => bindActionCreators({
    pridekNaujaVartotoja: (user) => addUser(user)
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

    handleSubmit = (e) => {
        console.log(this.state);
        const user = this.state;
        this.props.pridekNaujaVartotoja(user);
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
                    <div>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>Sign Up</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default compose(
    withRouter,
    connect(undefined, mapDispatchToProps))(SignUp)