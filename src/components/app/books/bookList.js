import React, {Component} from "react";
import {bindActionCreators, compose} from "redux";
import {deleteBook, fetchBook} from "../../model/actions/book-actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import {ListItemText} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";


const mapStateToProps = (state) => {
    return {book: state.book};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    uzkraukKnyguSarasa: () => fetchBook(),
    istrinkKnyga: (id) => deleteBook(id),
}, dispatch);


class BookList extends Component {

    componentDidMount() {
        this.props.uzkraukKnyguSarasa();
    }

    handleSubmit = (id) => {
        this.props.istrinkKnyga(id)
    };


    render() {

        const items = this.props.book.data;
        console.log('Gavau items i bookList propsus:');
        console.log(items);

        //Tikrina ar uzkrove items i propsus, jei dar ne, tai render dalies toliau nevykdo, bet rodo ekrane "Loading"
        if(!items.length) {

            return (<h1>Loading</h1>);
        }

        return (

            <div>
                {
                    items.map((item) => {
                        return (
                            <List key={item.book_id} component="nav" aria-label="mailbox folders">
                                <ListItem>
                                    <ListItemText primary={(<>"{item.title}"</>)}
                                                  secondary={(<>Autorius: {item.author}<br/>Išleista: {item.published_date}<br/>Kiekis: {item.quantity}</>)}/>
                                </ListItem>

                                <div className="leftmargin">
                                    <Button variant="contained" color="primary"
                                            onClick={() => this.handleSubmit(item.book_id)}>Delete</Button>
                                </div>

                                <Divider variant="inset" component="li"/>
                            </List>
                        )
                    })
                }
            </div>
        )
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);