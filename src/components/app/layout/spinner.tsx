import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        padding: 50,
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

interface Props {
}

const Spinner: React.FC<Props> = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress color="secondary" size={100}/>
        </div>
    );
};

export default Spinner;
