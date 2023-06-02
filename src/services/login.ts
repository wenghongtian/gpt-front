import axios from "axios";

type LoginReq = {
  username: string;
  password: string;
};

export type UserInfo = {
  id: number;
  userId: string;
  username: string;
  disabled: boolean;
};

export function loginService(data: LoginReq) {
  return axios.post<API.BaseResponse<UserInfo>>("/user/login", {
    data,
  });
}
