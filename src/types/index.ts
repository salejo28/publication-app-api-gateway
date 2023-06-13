export interface ICommonResponseAuth {
  success: boolean;
  access_token: string;
  refresh_token: string;
  message: string;
}

export interface ICommonResponse {
  success: boolean;
  message: string;
}

export interface ITimes {
  created_at: Date;
  updated_at: Date;
}
