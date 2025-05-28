interface IUser {
  id: string,
  email: string,
  name: string,
}

export type RegistrationResult = IUser

export type LoginResult = {
  user: IUser,
  accessToken: string
}
