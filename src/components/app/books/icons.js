import React from 'react';
import {green} from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteBook} from "../../model/actions/book-actions";
import IconButton from "@material-ui/core/IconButton";


export const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteBook: (id) => deleteBook(id),
}, dispatch);


const Iconos = (props) => {
    const handleSubmit = (id) => {
        props.deleteBook(id)
    };

    return (
        <div>
            <IconButton>
                <AddShoppingCartIcon fontSize="large" style={{color: green[500]}}/>
            </IconButton>
            <IconButton onClick={() => handleSubmit(props.id)}>
                <Icon className="material-icons" color="secondary" fontSize="large">delete_forever</Icon>
            </IconButton>
        </div>
    );
};


export default compose(
    withRouter,
    connect(undefined, mapDispatchToProps)
)(Iconos);