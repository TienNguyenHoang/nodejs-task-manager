import { request } from '@utils';
import type { ChangePasswordRequest, EditProfileRequest, UserProfile } from '~/Models';

export const EditProfileApi = async (form: EditProfileRequest) => {
    try {
        const response = await request.put<{
            message: string;
            user: UserProfile;
        }>('users/editProfile', form);
        return response.data;
    } catch (err) {
        console.log('error from LoginAPI', err);
    }
};

export const ChangePasswordApi = async (form: ChangePasswordRequest) => {
    try {
        const response = await request.put<{ message: string }>('users/changePassword', form);
        return response.data;
    } catch (err) {
        console.log('error from RegisterAPI', err);
    }
};
