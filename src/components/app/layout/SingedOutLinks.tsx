import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface SignedOutLinksProps extends RouteComponentProps {}

const SignedOutLinks: React.FC<SignedOutLinksProps> = (props) => (
    <Toolbar>
        <Button color="inherit" onClick={() => props.history.push('/')}>Home</Button>
        <Button color="inherit" onClick={() => props.history.push('/signin')}>Log In</Button>
        <Button color="inherit" onClick={() => props.history.push('/signup')}>Sign Up</Button>
    </Toolbar>
);

export default withRouter(SignedOutLinks);
