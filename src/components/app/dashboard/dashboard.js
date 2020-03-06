import React, {Component} from "react";
import BookList from "../books/bookList";

class Dashboard extends Component {


    render() {

        return (
            <div align="center">
                <h1>Books for sale</h1>
                <BookList/>
            </div>
        )
    }
}

export default Dashboard;