export interface Book {
    book_id?: number;
    title: string;
    author: string;
    published_date: string;
    book_cover: string;
    quantity: string;
}


export interface BookState {
    isFetching: boolean,
    data: Book[],
    error: string,
}
