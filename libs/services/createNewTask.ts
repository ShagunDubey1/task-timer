import apis from '@/apis';
import axiosConfig from './axiosInstance';
import { AxiosResponse } from 'axios';

export interface CreateNewTaskResponse {
  id: string;
}

export default async function CreateNewTask(): Promise<
  AxiosResponse<CreateNewTaskResponse>
> {
  return await axiosConfig.get(apis.task.create);
}
