import type { AxiosResponse } from 'axios';
import { $http } from '.';

export interface CreateAccountPayload {
    address: string;
    password: string;
}

export interface Account {
    '@context': string;
    '@id': string;
    '@type': string;
    id: string;
    address: string;
    quota: number;
    used: number;
    isDisabled: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    password: string;
}

export interface TokenResponse {
    token: string;
    id: string;
}

export class AuthenticationServices {
    static createAccount(payload: CreateAccountPayload) {
        return $http.post<
            CreateAccountPayload,
            AxiosResponse<Omit<Account, 'password'>>
        >(`/accounts`, payload);
    }
    static getToken(payload: CreateAccountPayload) {
        return $http.post<CreateAccountPayload, AxiosResponse<TokenResponse>>(
            '/token',
            payload
        );
    }
}
