import React from 'react';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import {Container, ListItemText} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import {deleteUser} from '../../model/actions/user-actions';
import {User, UserRole} from "../../model/dataTypes/UserState";


const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteUser: (id) => deleteUser(id),
}, dispatch);

interface UserDetailsProps extends RouteComponentProps {
    deleteUser: (id: number) => void;
}

interface PassedProps {
    user: User;
    myRole: UserRole;
}

type Props = UserDetailsProps & PassedProps;

const UserDetails: React.FC<Props> = (props) => {
    const {user} = props;
    const {myRole} = props;

    const handleSelectedUserOrders = (id) => {
        props.history.push(`/userlist/${id}`);
    };

    const handleDeleteUser = (id) => {
        props.deleteUser(id);
    };

    return (
        <Container fixed maxWidth="xs">
            <List>
                <Paper>
                    <ListItem
                        button
                        onClick={() => handleSelectedUserOrders(user.user_id)}
                    >
                        <Grid container spacing={0}>
                            <ListItemText
                                primary={(
                                    <>
                                        {user.name}{' '}{user.surname}
                                    </>
                                )}
                                secondary={(
                                    <>
                                        Username:{' '}{user.username}<br/>
                                        Password:{' '}{user.password}<br/>
                                        Role:{' '}{myRole.role_name}{' '}
                                    </>
                                )}
                            />
                            <IconButton onClick={() => handleDeleteUser(user.user_id)}>
                                <Icon
                                    className="material-icons"
                                    color="secondary"
                                    fontSize="large"
                                >
                                    delete_forever
                                </Icon>
                            </IconButton>
                        </Grid>
                    </ListItem>
                </Paper>
            </List>
        </Container>
    );
};


export default compose(withRouter, connect(undefined, mapDispatchToProps))(UserDetails) as React.ComponentType<PassedProps>;
