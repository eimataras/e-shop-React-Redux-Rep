import React from 'react';
import './App.css';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import SignUp from './auth/SignUp';
import AddBook from './books/addBook';
import UserList from './orders/userList';
import MyOrder from './orders/myOrder';
import MyOrderHistory from './orders/myOrderHistory';
import BookList from './books/bookList';
import NavBar from './layout/Navbar';
import SignIn from './auth/SignIn';
import {connect} from "react-redux";
import {CurrentUserState} from "../model/dataTypes/CurrentUserState";

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
});

interface AppProps {
    currentUser: CurrentUserState;
}

const App: React.FC<AppProps> = (props) => {
    let redirectToUrl;
    if (props.currentUser.error === 'errorRedirectToSignIn') {
        redirectToUrl = <Redirect to="/signin"/>;
    }

    return (
        <HashRouter>
            <NavBar/>
            {redirectToUrl}
            <Switch>
                <Route path="/" exact component={BookList}/>
                <Route path="/signin" exact component={SignIn}/>
                <Route path="/signup" exact component={SignUp}/>
                <Route path="/addbook" exact component={AddBook}/>
                <Route path="/userlist" exact component={UserList}/>
                <Route path="/userlist/:userId" exact component={UserList}/>
                <Route path="/myOrder" exact component={MyOrder}/>
                <Route path="/myOrderHistory" exact component={MyOrderHistory}/>
            </Switch>
        </HashRouter>
    );
};

export default connect(mapStateToProps, undefined)(App) as React.ComponentType<any>;
