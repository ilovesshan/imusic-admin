<template>
  <div class="home-page">
    <img src="/vite.svg" class="logo" alt="Vite logo" />
    <p class="title">imusic音乐盒</p>
  </div>
</template>

<script lang="ts" setup >

</script>
<style scoped lang="less">
.home-page {
  width: 200px;
  height: 500px;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .title {
    font-size: 18px;
  }

  .logo {
    height: 100px;
    padding: 1.5em;
    will-change: filter;
  }

  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}
</style>
