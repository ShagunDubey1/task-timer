export const baseURL: string = process.env.EXPO_PUBLIC_BASE_URL!;
export const APIURL: string = process.env.EXPO_PUBLIC_API_URL!;

export default {
  login: `${APIURL}/auth/login`,
  refresh: `${APIURL}/auth/refresh`,
  task: {
    create: `${APIURL}/tasks/new`,
    getAll: `${APIURL}/tasks`,
    getNew: `${APIURL}/tasks/new`,
  },
};
