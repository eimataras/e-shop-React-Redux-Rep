import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {RouteComponentProps, withRouter} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

interface AdminLinksProps extends RouteComponentProps {
    nameFirstLetter: string;
    surnameFirstLetter: string;
    handleLogout: () => void;
}

const AdminLinks: React.FC<AdminLinksProps> = (props) => {
    const classes = useStyles();
    const {nameFirstLetter} = props;
    const {surnameFirstLetter} = props;
    const {handleLogout} = props;
    return (
        <Toolbar>
            <Button color="inherit" onClick={() => props.history.push('/')}>Home</Button>
            <Button color="inherit" onClick={() => props.history.push('/myOrder')}>My Order</Button>
            <Button color="inherit" onClick={() => props.history.push('/myOrderHistory')}>My Orders History</Button>
            <Button color="inherit" onClick={() => props.history.push('/addbook')}>Add New Book</Button>
            <Button color="inherit" onClick={() => props.history.push('/signup')}>Add New User</Button>
            <Button color="inherit" onClick={() => props.history.push('/userlist')}>Users</Button>
            <Button color="inherit" type="submit" onClick={handleLogout}>Sign Out</Button>

            <div className={classes.root}>
                <Avatar style={{backgroundColor: 'grey'}} className={classes.root}>
                    {nameFirstLetter}
                    {surnameFirstLetter}
                </Avatar>
            </div>
        </Toolbar>
    );
};

export default withRouter(AdminLinks);
