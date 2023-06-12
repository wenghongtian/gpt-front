import request from "@/utils/request";

type SpeechAuth = {
  token: string;
  region: string;
};

export function getSpeechTokenService() {
  return request<API.BaseResponse<SpeechAuth>>("/speech/auth");
}
