import React from 'react';
import {green} from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteBook} from "../../model/actions/book-actions";
import IconButton from "@material-ui/core/IconButton";
import {addOrder} from "../../model/actions/order-actions";


export const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteBook: (id) => deleteBook(id),
    addOrder: (id) => addOrder(id),
}, dispatch);


const Iconos = (props) => {
    const handleDeleteSubmit = (id) => {
        props.deleteBook(id)
    };

    const handleAddSubmit = (id) => {
        props.addOrder(id)
    };

    return (
        <div>
            <IconButton onClick={() => handleAddSubmit(props.id)}>
                <AddShoppingCartIcon fontSize="large" style={{color: green[500]}}/>
            </IconButton>
            <IconButton onClick={() => handleDeleteSubmit(props.id)}>
                <Icon className="material-icons" color="secondary" fontSize="large">delete_forever</Icon>
            </IconButton>
        </div>
    );
};


export default compose(
    withRouter,
    connect(undefined, mapDispatchToProps)
)(Iconos);