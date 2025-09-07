import { request } from '@utils';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '~/Models';

export const LoginApi = async (form: LoginRequest) => {
    try {
        const response = await request.post<LoginResponse>('auth/login', form);
        return response.data;
    } catch (err) {
        console.log('error from LoginAPI', err);
    }
};

export const RegisterApi = async (form: RegisterRequest) => {
    try {
        const response = await request.post<RegisterResponse>('auth/register', form);
        return response.data;
    } catch (err) {
        console.log('error from RegisterAPI', err);
    }
};
