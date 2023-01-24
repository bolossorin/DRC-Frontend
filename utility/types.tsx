export interface IFilter {
  name: string,
  value: string,
  condition: string
}

export interface INotification {
  status: string,
  message: string,
  state: string,
  subMessage: string,
  icon: string
}

export interface IUser {
  name: string
  picture: string
  nickname: string
  sid: string
}