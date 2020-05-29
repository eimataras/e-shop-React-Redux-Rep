export interface CurrentUserRole {
    user_role_id: number;
    user_id: number;
    role_id: number;
    role_name: string;
    length: number;
}

export interface CurrentUser {
    exp: number;
    iat: number;
    nameFirstLetter: string;
    roles: CurrentUserRole[];
    sub: string;
    surnameFirstLetter: string;
}

export interface CurrentUserState {
    isFetching: boolean;
    isAuthenticated: boolean;
    data: CurrentUser;
    error: string;
}
