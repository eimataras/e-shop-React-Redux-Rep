import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import SignUp from './auth/SignUp';
import AddBook from './books/addBook';
import UserList from './orders/userList';
import MyOrder from './orders/myOrder';
import MyOrderHistory from './orders/myOrderHistory';
import BookList from './books/bookList';
import NavBar from './layout/Navbar';
import SignIn from './auth/SignIn';


class App extends Component {
  render() {
    return (
      <HashRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact component={BookList} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/addbook" exact component={AddBook} />
          <Route path="/userlist" exact component={UserList} />
          <Route path="/userlist/:userId" exact component={UserList} />
          <Route path="/myOrder" exact component={MyOrder} />
          <Route path="/myOrderHistory" exact component={MyOrderHistory} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
