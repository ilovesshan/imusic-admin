<template>
  <div class="login-page">
    <q-card flat bordered>
      <div class="form">
        <p class="title">imusic 音乐后台</p>
        <q-form @submit="login" class="q-gutter-md">

          <q-input filled v-model="userInfo.username" label="用户名" hint="" lazy-rules
            :rules="[val => val && val.length > 0 || '请输入用户名']" />

          <q-input filled type="password" v-model="userInfo.password" label="密码" lazy-rules
            :rules="[val => val !== null && val !== '' || '请输入密码',]" />

          <!-- <q-toggle v-model="remember" label="记住密码" /> -->
          <div>
            <q-btn label="登录" unelevated type="submit" color="primary" class="full-width" />
          </div>
        </q-form>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts" setup >
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { userStore } from "@/store/index";

import { IUserInfo } from "./types";
import { showError } from "@/utils/Notify";
import { SCache } from "@/utils/cache";
import { IUserDetailState } from "@/store/modules/user";

const router = useRouter()

// const remember = ref<boolean>(false)
const userInfo = reactive<IUserInfo>({
  username: "admin",
  password: "",
})

const login = (): void => {
  userStore.login(userInfo).then(_ => {
    const roleList: Array<string> = (SCache.get("userDetail") as IUserDetailState).roleList.map(role => role.name);
    if (roleList.length > 0 && roleList.includes("ROLE_ADMIN")) {
      router.push("/home");
    } else {
      showError("非管理员用户暂时不能登录后台管理系统");
      userStore.logout();
    }
  });
}
</script>

<style scoped lang="less">
.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    width: 400px;
    padding: 15px;

    .title {
      text-align: center;
      font-size: 28px;
      margin-bottom: 40px;
    }
  }
}
</style>
