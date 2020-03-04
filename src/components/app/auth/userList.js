import React, {Component} from "react";
import {bindActionCreators, compose} from "redux";
import {deleteUser, fetchUser} from "../../model/actions/user-actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {ListItemText} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";


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

        // Tikrina ar uzkrove items i propsus, jei ne, tai render dalies toliau nevykdo, bet rodo ekrane "Loading"
        if (!items.length) {

            return (<h1>Loading</h1>);
        }


        return (
            <div>
                {
                    items.map((item) => {

                        // Surandu roles irasa (irasas tik vienas), kuriame yra reikiamas user_id
                        const myRole = item.roles.find(role => {

                            return role.user_id === item.user_id
                        });

                        if (!myRole) {
                            return null;
                        }
                        return (
                            <List key={item.user_id}>
                                <ListItem>
                                    <ListItemText primary={(<>{item.name} {item.surname}</>)}
                                                  secondary={(<>Username: {item.username}<br/>Password: {item.password}<br/>Role: {myRole.role_name} </>)}/>
                                </ListItem>

                                <div className="leftmargin">
                                    <Button variant="contained" color="primary"
                                            onClick={() => this.handleSubmit(item.user_id)}>Delete account</Button>
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
)(UserList);