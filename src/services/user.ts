import request from "@/utils/request";

type LoginReq = {
  username: string;
  password: string;
  phone?: string;
};

export type UserInfo = {
  id: number;
  userId: string;
  username: string;
  disabled: boolean;
};

export function loginService(data: LoginReq) {
  return request<API.BaseResponse<{ accessToken: string }>>("/auth/login", {
    method: "POST",
    data,
  });
}

export function registryService(data: LoginReq) {
  return request<API.BaseResponse<boolean>>("/user", {
    data,
    method: "POST",
  });
}

export function getUserInfoService() {
  return request<API.BaseResponse<UserInfo>>("/user");
}
