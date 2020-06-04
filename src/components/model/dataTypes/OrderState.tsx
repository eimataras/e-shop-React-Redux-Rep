export interface OrderItemsAndBook {
    orderItemId: number;
    orderId: number;
    bookId: number;
    title: string;
    author: string;
    publishedDate: string;
    bookCover: string;
    quantity: number;
}

export interface Order {
    orderId: number;
    userId: number;
    name: string;
    surname: string;
    username: string;
    password: string;
    statusId: number;
    type: string;
    items: OrderItemsAndBook[];
}

export interface OrderState {
    isFetching: boolean;
    data: Order[];
    error: string | undefined;
}
