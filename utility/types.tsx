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