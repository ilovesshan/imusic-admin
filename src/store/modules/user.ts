import { defineStore } from "pinia"

import type { IUserInfo } from "@/views/login/types";

import { getUserInfoById, login } from "@/api/user";
import { SCache } from "@/utils/cache"
import { showError } from "@/utils/Notify";

interface IUserDetailState {
  id: string,
  username: string,
  nickname: string,
  gender: string,
  roleList: string,
  locked: boolean,
  enabled: boolean
  lastLoginIp: string,
  lastLoginTime: string,
  createdTime: string,
  updatedTime: string,
}

interface IUserStoreState {
  id: string,
  username: string,
  token: string,
  userDetail: IUserDetailState,
}



interface IUserStoreActions {
  login: (userInfo: IUserInfo) => Promise<any>,
  logout: () => Promise<any>,
}

const userStore = defineStore("userStore", {
  state: (): IUserStoreState => {
    return {
      id: SCache.get("id"),
      username: SCache.get("username"),
      token: SCache.get("token"),
      userDetail: SCache.get("userDetail"),
    }
  },

  getters: {},

  actions: {
    // 登录
    login(userInfo: IUserInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          const { code, message, data } = res;
          if (code === 200) {
            const { id, username, token } = data;
            SCache.set("token", token);

            // 获取用户信息
            getUserInfoById(id).then(res => {
              SCache.set("id", id);
              SCache.set("username", username);
              SCache.set("userDetail", res.data);
              this.$patch({ id, username, token, userDetail: res.data });
              resolve(1);
            });
          } else {
            showError(message);
          }
        })
      })
    },

    // 退出登录
    logout() {
      return new Promise((resolve, reject) => {
        SCache.clear();
        resolve(1);
      })
    },
  },
});


export default userStore;