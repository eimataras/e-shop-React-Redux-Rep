export interface Book {
    bookId: number;
    title: string;
    author: string;
    publishedDate: string;
    bookCover: string;
    quantity: number;
}


export interface BookState {
    isFetching: boolean,
    data: Book[],
    error: string,
}
