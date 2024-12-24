import apis from '@/apis';
import axios from 'axios';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

export async function loginRequest(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const { data } = await axios.post<LoginResponse>(apis.login, credentials);
  return data;
}
