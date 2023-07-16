export type Type = 'error' | 'sucess';

export type SessionStatus = 'checking' | 'not-authenticated' | 'authenticated';
export type UserStatus = 'verified' | 'pending' | 'banned';
export type UserRole = 'customer' | 'salesman' | 'admin';

export type Messages = { type: Type; msg: string };
export type Errors = {
    [key: string]: {
        type: string;
        value: string;
        msg: string;
        path: string;
        location: string;
    };
};

export type User = {
    username: string;
    slug: string;
    role: UserRole;
    photo_url: string;
    status: UserStatus;
    email_verified: boolean;
};

export interface InitialStateAuth {
    user: User | null;
    messages?: Messages;
    sessionStatus: SessionStatus;
    loading: boolean;
    tokenSession: string | null;
}

export interface AuthResponse {
    ok: boolean;
    tokenSession: string;
    user: User;
    messages: Messages;
}

export interface SimpleResponse {
    ok: boolean;
    messages: Messages;
}

export interface RegisterValues {
    username: string;
    email: string;
    password: string;
}
export interface LoginValues {
    email: string;
    password: string;
}

export interface ErrorResponse {
    response: {
        data: { ok: boolean; messages?: Messages; errors?: Errors };
    };
}
