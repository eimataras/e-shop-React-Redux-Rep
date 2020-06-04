export interface UserRole {
    userRoleId: number;
    userId: number;
    roleId: number;
    roleName: string;
}

export interface User {
    userId: number;
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
