import React, {Component} from "react";
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import {Container, ListItemText} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import {fetchBook} from "../../model/actions/book-actions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Icons from "./icons";
import {fetchOrder} from "../../model/actions/order-actions";


const mapStateToProps = (state) => {
    return {
        book: state.book,
        currentUser: state.currentUser
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchBook: () => fetchBook(),
    fetchOrder: () => fetchOrder(),
}, dispatch);


class BookList extends Component {
    componentDidMount() {
        this.props.fetchBook();
        this.props.fetchOrder();
    }

    render() {
        // const loginUserId = Number(this.props.match.params.userId);
        const {isAuthenticated} = this.props.currentUser;
        const currentUserInfo = isAuthenticated ? (
            this.props.currentUser.data.roles.length ? (
                this.props.currentUser.data.roles.find(info => {
                    return info
                })
            ) : undefined) : ('');
        const loginUserId = currentUserInfo.user_id;
        const loginUserRole = currentUserInfo.role_name;
        const statusNewId = 1;

        const items = this.props.book.data;
        if (!items.length) {
            return (<h1>Loading</h1>);
        }

        return (
            <Container fixed maxWidth="md">
                {items.map((item) => {
                    return (
                        <List key={item.book_id}>
                            <Paper>
                                <ListItem button>
                                    <Grid container spacing={0}>
                                        <ListItemText primary={(<>"{item.title}"</>)}
                                                      secondary={(<>Autorius: {item.author}<br/>Išleista: {item.published_date}<br/>Kiekis: {item.quantity}</>)}/>
                                        <Icons loginUserId={loginUserId} loginUserRole={loginUserRole}
                                               statusNewId={statusNewId}
                                               book_id={item.book_id}/>
                                    </Grid>
                                </ListItem>
                            </Paper>
                        </List>
                    )
                })
                }
            </Container>
        )
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);