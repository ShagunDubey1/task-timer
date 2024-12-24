import apis from '@/apis';
import axios from 'axios';

export default async function CreateNewTask() {
  return await axios.post(apis.task.create, {
    headers: {
      // Authorization: `Bearer ${accessToken}`,
    },
  });
}
