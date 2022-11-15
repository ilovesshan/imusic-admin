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
          {{ userStore.username }}
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
import { ref } from 'vue'
import { userStore } from "@/store/index";

const leftDrawerOpen = ref<boolean>(false)

const toggleLeftDrawer = (): void => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>

<style scoped lang="sass">

</style>
