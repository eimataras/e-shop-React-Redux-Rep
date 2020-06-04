import React from 'react';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { ListItemText } from '@material-ui/core';
import { Book } from '../../model/dataTypes/BookState';
import Icons from './icons';

interface BookInfoProps {
    book: Book;
}

const BookInfo: React.FC<BookInfoProps> = (props) => {
    const { bookId } = props.book;
    return (
        <List>
            <Paper>
                <ListItem button>
                    <Grid container spacing={0}>
                        <ListItemText
                            primary={(<>&quot;{props.book.title}&quot;</>)}
                            secondary={(<>Autorius: {props.book.author}<br/>Išleista: {props.book.publishedDate}<br/>Kiekis: {props.book.quantity}</>)}
                        />
                        <Icons bookId={bookId}/>
                    </Grid>
                </ListItem>
            </Paper>
        </List>
    );
};

export default BookInfo as React.ComponentType<BookInfoProps>;
