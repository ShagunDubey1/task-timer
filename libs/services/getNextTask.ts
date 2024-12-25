import apis from '@/apis';
import axiosConfig from './axiosInstance';
import { AxiosResponse } from 'axios';
import { Task } from '@/@types';


export default async function getNextTask(options: {
  id: string;
}): Promise<AxiosResponse<Task>> {
  const { id } = options;
  return await axiosConfig.get(`${apis.task.getNext}/${id}`);
}
