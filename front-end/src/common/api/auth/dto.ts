export type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  }
}
