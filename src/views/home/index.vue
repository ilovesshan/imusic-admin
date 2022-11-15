<template>
  <div>
    <img @click="getData" src="/vite.svg" class="logo" alt="Vite logo" />
    <p>imusic音乐盒</p>
  </div>
</template>

<script lang="ts" setup >
import request from '@/api/request';

const getData = () => {
  request({
    method: "get",
    url: "/users"
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
