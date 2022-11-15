import request from "./request";

import type { IUserInfo } from "@/views/login/types";

export function login(userinfo: IUserInfo) {
  return request({
    url: "/login",
    method: "POST",
    data: userinfo,
  })
}