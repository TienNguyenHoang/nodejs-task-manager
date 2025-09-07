import { request } from '@utils';
import type { Task } from '~/Models';
import type { CreateTaskRequest, UpdateTaskRequest } from '~/Models/Task';

export const GetAllTaskApi = async () => {
    try {
        const response = await request.get<Task[]>('tasks');
        return response.data;
    } catch (err) {
        console.log('error from GetAllTaskApi', err);
    }
};

export const CreateTaskApi = async (form: CreateTaskRequest) => {
    try {
        const response = await request.post<{
            message: string;
            task: Task;
        }>('tasks', form);
        return response.data;
    } catch (err) {
        console.log('error from CreateTaskApi', err);
    }
};

export const UpdateTaskApi = async (taskId: number, form: UpdateTaskRequest) => {
    try {
        const response = await request.put<{
            message: string;
            task: Task;
        }>(`tasks/${taskId}`, form);
        return response.data;
    } catch (err) {
        console.log('error from UpdateTaskApi', err);
    }
};

export const DeleteTaskApi = async (taskId: number) => {
    try {
        const response = await request.delete<{ message: string }>(`tasks/${taskId}`);
        return response.data;
    } catch (err) {
        console.log('error from DeleteTaskApi', err);
    }
};
