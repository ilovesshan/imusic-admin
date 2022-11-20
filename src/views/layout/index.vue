<template>
  <div class="layout-page">
    <q-layout view="hHh LpR fFf">
      <!-- 头部区域 -->
      <q-header  class="bg-primary text-white">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
          <q-toolbar-title> imusic </q-toolbar-title>
          <q-chip>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <span @click="logout">{{ username }}</span>
          </q-chip>
        </q-toolbar>
      </q-header>

      <!-- 导航区域 -->
      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
        <q-list class="rounded-borders text-primary">
          <q-item  :to="item.path" :active="route.name === item.name " v-for="item in asyncRouter" :key="item.name" clickable v-ripple active-class="active-menu-link">
            <q-item-section avatar>
              <q-icon :name="item.meta!.icon" />
            </q-item-section>
            <q-item-section>{{ item.meta!.title }}</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <!-- 主体区域 -->
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts" setup >
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { userStore } from "@/store/index";
import { showConfirmDialog } from '@/utils/Dialog';
import { asyncRouter } from "../../router/index"

const route = useRoute();
const leftDrawerOpen = ref<boolean>(false);
const username = computed(() => userStore.username);

const toggleLeftDrawer = (): void => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const logout = (): void => {
  showConfirmDialog("退出", "确定退出吗?").then(res => {
    userStore.logout().then(res => {
      window.location.reload();
    })
  }).catch(_ => { });
}

</script>

<style scoped lang="less">
.layout-page {
  .active-menu-link {
    color: white;
    background: #F2C037
  }
}
</style>
