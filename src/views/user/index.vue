<template>
  <div class="user-page">
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
const selectConditions = reactive<ISelectConditions>({
  pageNum: 1,
  pageSize: 3,
});

const loadTata = () => {
  getUserList(selectConditions).then(res => {
    if (res.code == 200) {
      rows.value = res.data.content;
      total.value = res.data.totalPages;
    }
  });
}

watch(() => selectConditions.pageNum, (_) => {
  loadTata();
})

loadTata();

</script>
<style scoped lang="less">
.user-page {
  padding: 15px;

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }
}
</style>
