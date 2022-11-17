<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-white">
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
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered> </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup >
import { ref, computed } from 'vue';
import { userStore } from "@/store/index";
import { showConfirmDialog } from '@/utils/Dialog';

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

<style scoped lang="sass">

</style>
