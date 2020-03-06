import React, {Component} from "react";
import {bindActionCreators, compose} from "redux";
import {deleteUser, fetchUser} from "../../model/actions/user-actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Container, ListItemText} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";


const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    uzkraukVartotojuSarasa: () => fetchUser(),
    istrinkVartotoja: (id) => deleteUser(id),
}, dispatch);


class UserList extends Component {


    componentDidMount() {
        this.props.uzkraukVartotojuSarasa();
    }

    handleSubmit = (id) => {
        this.props.istrinkVartotoja(id);
    };


    render() {
        const items = this.props.user.data;

        if (!items.length) {
            return (<h1>Loading</h1>);
        }


        return (
            <div align="center">
                <h1>Users list</h1>
                {items.map((item) => {

                    // Surandu roles irasa (irasas tik vienas), kuriame yra reikiamas user_id
                    const myRole = item.roles.find(role => {
                        return role.user_id === item.user_id
                    });

                    if (!myRole) {
                        return null;
                    }
                    return (
                        <Container fixed maxWidth="xs" key={item.user_id}>
                            <List>
                                <Paper>
                                    <ListItem button>
                                        <Grid container spacing={0}>
                                            <ListItemText primary={(<>{item.name} {item.surname}</>)}
                                                          secondary={(<>Username: {item.username}<br/>Password: {item.password}<br/>Role: {myRole.role_name} </>)}/>
                                            <IconButton onClick={() => this.handleSubmit(item.user_id)}>
                                                <Icon className="material-icons" color="secondary"
                                                      fontSize="large">delete_forever</Icon>
                                            </IconButton>
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
)(UserList);