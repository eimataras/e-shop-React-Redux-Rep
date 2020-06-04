export interface CurrentUserRole {
    userRoleId: number;
    userId: number;
    roleId: number;
    roleName: string;
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
