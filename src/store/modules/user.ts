import { defineStore } from "pinia"

import type { IUserInfo } from "@/views/login/types";

import { login } from "@/api/user";
import { SCache } from "@/utils/cache"
import { showError } from "@/utils/Notify";

interface IUserStoreState {
  id: string,
  username: string,
  token: string,
  roles: Array<string>,
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
      roles: [],
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
            SCache.set("id", id);
            SCache.set("username", username);
            SCache.set("token", token);
            this.$patch({ id, username, token });
            resolve(1);
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