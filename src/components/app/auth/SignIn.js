import React, {Component} from "react";
import Button from "@material-ui/core/Button";





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
        console.log(this.state)
    };

    render() {
        return (
            <div>
                <form >
                    <h2>Sign In:</h2>
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input type="username" id="username" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>Login</Button>
                    </div>
                </form>

            </div>
        )
    }
}

export default SignIn