import request from "./request";

import type { IUserInfo } from "@/views/login/types";
import type { ISelectConditions } from "@/views/user/type";

// 登录
export function login(userinfo: IUserInfo) {
  return request({
    url: "/auth",
    method: "POST",
    data: userinfo,
  })
}


// 获取用户列表
export function getUserList(selectConditions: ISelectConditions) {
  return request({
    url: "/users",
    method: "GET",
    params: selectConditions,
  })
}
