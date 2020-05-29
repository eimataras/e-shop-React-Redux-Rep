export interface OrderItemsAndBook {
    order_item_id: number;
    order_id: number;
    book_id: number;
    title: string;
    author: string;
    published_date: string;
    book_cover: string;
    quantity: number;
}

export interface Order {
    order_id: number;
    user_id: number;
    name: string;
    surname: string;
    username: string;
    password: string;
    status_id: number;
    type: string;
    items: OrderItemsAndBook[];
}

export interface OrderState {
    isFetching: boolean;
    data: Order[];
    error: string | undefined;
}
