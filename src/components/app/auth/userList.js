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
    return {users: state.users};
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
        this.props.istrinkVartotoja(id)
    };

    render() {

        const items = this.props.users.data;
        console.log('Gavau items i userList propsus:');
        console.log(items);

        return (
            <div>
                {
                    items.map((item) => {
                        return (
                            <List key={item.user_id} >
                                <ListItem>
                                    <ListItemText primary={(<>{item.name} {item.surname}</>)} secondary={(<>Username: {item.username}<br/>Password: {item.password}</>)}/>
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