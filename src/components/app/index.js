import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from "./layout/Navbar";
import Dashboard from "./dashboard/dashboard";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import AddBook from "./books/addBook";
import UserList from "./auth/userList";


class App extends React.Component {

    render() {

        return (
            <BrowserRouter>
                <Navbar/>
                <Switch>
                    <Route path='/' exact={true} component={Dashboard}/>
                    <Route path='/signin' exact={true} component={SignIn}/>
                    <Route path='/signup' exact={true} component={SignUp}/>
                    <Route path='/addbook' exact={true} component={AddBook}/>
                    <Route path='/userlist' exact={true} component={UserList}/>
                    {/*<Route path='/book/:id' exact={true} component={BookDetails}/>*/}

                </Switch>
            </BrowserRouter>
        );
    }
}

export default App