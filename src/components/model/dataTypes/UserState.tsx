export interface UserRole {
    user_role_id: number;
    user_id: number;
    role_id: number;
    role_name: string;
}

export interface User {
    user_id: number;
    name: string;
    surname: string;
    username: string;
    password: string;
    uid: string;
    roles: UserRole[];
}

export interface UserState {
    isFetching: boolean;
    data: User[];
    error: string;
}
