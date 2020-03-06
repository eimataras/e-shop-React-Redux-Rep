import React, {Component} from "react";
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import {Container, ListItemText} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Iconos from "./icons";
import {fetchBook} from "../../model/actions/book-actions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";


const mapStateToProps = (state) => {
    return {book: state.book};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchBook: () => fetchBook(),
}, dispatch);


class BookList extends Component {
    componentDidMount() {
        this.props.fetchBook();
    }

    render() {
        const items = this.props.book.data;

        if (!items.length) {
            return (<h1>Loading</h1>);
        }

        return (
            <div>
                {items.map((item) => {
                    return (
                        <Container fixed maxWidth="xs" key={item.book_id}>
                            <List>
                                <Paper>
                                    <ListItem button>
                                        <Grid container spacing={0}>
                                            <ListItemText primary={(<>"{item.title}"</>)}
                                                          secondary={(<>Autorius: {item.author}<br/>Išleista: {item.published_date}<br/>Kiekis: {item.quantity}</>)}/>
                                            <Iconos id={item.book_id}/>
                                        </Grid>
                                    </ListItem>
                                </Paper>
                            </List>
                        </Container>
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