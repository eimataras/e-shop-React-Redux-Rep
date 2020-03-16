import React from 'react';
import './App.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import Navbar from "./layout/Navbar";
import Dashboard from "./dashboard/dashboard";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import AddBook from "./books/addBook";
import UserList from "./auth/userList";
import MyOrder from "./myOrder/myOrder";


class App extends React.Component {

    render() {
        return (
            <HashRouter>
                <Navbar/>
                <Switch>
                    <Route path='/' exact={true} component={Dashboard}/>
                    <Route path='/signin' exact={true} component={SignIn}/>
                    <Route path='/signup' exact={true} component={SignUp}/>
                    <Route path='/addbook' exact={true} component={AddBook}/>
                    <Route path='/userlist' exact={true} component={UserList}/>
                    <Route path='/userlist/:userId' exact={true} component={UserList}/>
                    <Route path='/myOrder/:userId' exact={true} component={MyOrder}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App