<template>
  <div class="user-page">
    <div class="row search-bar">
      <div class="col-3">
        <q-input filled v-model="selectConditions.username" :dense="false" label="用户名" />
      </div>
      <div class="col-1"></div>
      <div class="col-3">
        <q-select filled v-model="selectConditions.enabled" :options="['启用', '锁定']" label="状态" />
      </div>
      <div class="col-1"></div>
      <div class="col-3">
        <q-select filled v-model="selectConditions.gender" :options="['男', '女']" label="性别" />
      </div>
      <div class="col-2 btns">
        <q-btn outline @click="loadTata" color="primary" icon="search" label="搜索" />
        <q-btn outline @click="reset" color="secondary" icon="restart_alt" label="重置" />
      </div>
    </div>
    <q-table :rows="rows" :columns="columns" row-key="name" hide-pagination />
    <div class="pagination">
      <q-pagination boundary-numbers v-model="selectConditions.pageNum" :max="total" max-pages="6" direction-links />
    </div>
  </div>
</template>

<script lang="ts" setup >

import type { ISelectConditions, IUserData } from './type';
import { useTableColumn } from "./hooks"
import { reactive, ref, watch } from 'vue';
import { getUserList } from '@/api/user';

const columns = useTableColumn();
const rows = ref<Array<IUserData>>([])

const total = ref<number>(0);
let selectConditions = reactive<ISelectConditions>({
  pageNum: 1,
  pageSize: 5,
  username: "",
  enabled: null,
  gender: null,
});

const loadTata = () => {
  getUserList(selectConditions).then(res => {
    if (res.code == 200) {
      rows.value = res.data.content;
      total.value = res.data.totalPages;
    }
  });
}

const reset = () => {
  selectConditions.username = "";
  selectConditions.enabled = null
  selectConditions.gender = null;
  selectConditions = { pageNum: 1, pageSize: 3 };
  loadTata();
}

watch(() => selectConditions.pageNum, (_) => {
  loadTata();
})

loadTata();

</script>
<style scoped lang="less">
.user-page {
  padding: 15px;

  .search-bar {
    margin-bottom: 20px;

    .btns {
      width: 400px;
      display: flex;
      margin-top: 15px;

      button {
        margin-right: 10px;
      }
    }
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }
}
</style>
