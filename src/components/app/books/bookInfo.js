import React from "react";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import {ListItemText} from "@material-ui/core";
import Icons from "./icons";

function BookInfo({book}) {
    return (
        <List>
            <Paper>
                <ListItem button>
                    <Grid container spacing={0}>
                        <ListItemText primary={(<>"{book.title}"</>)}
                                      secondary={(<>Autorius: {book.author}<br/>Išleista: {book.published_date}<br/>Kiekis: {book.quantity}</>)}/>
                        <Icons book_id={book.book_id}/>
                    </Grid>
                </ListItem>
            </Paper>
        </List>
    )
}

export default BookInfo