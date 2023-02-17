export interface INotification {
  id: string;
  user_id?: string;
  session_id?: number;
  status: string;
  title: string;
  description: string;
  is_read: boolean;
  modified_at: Date;
  created_at: Date;
}
