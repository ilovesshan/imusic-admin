<template>
  <div class="user-page">

    <!-- 搜索框 -->
    <div class="row search-bar">

      <div class="col-2">
        <q-input filled v-model="selectConditions.username" :dense="false" label="用户名" />
      </div>
      <div class="col-1"></div>


      <div class="col-2">
        <q-input filled v-model="selectConditions.nickname" :dense="false" label="昵称" />
      </div>
      <div class="col-1"></div>


      <div class="col-2">
        <q-select filled v-model="selectConditions.enabled" :options="['启用', '锁定']" label="状态" />
      </div>
      <div class="col-1"></div>


      <div class="col-2">
        <q-select filled v-model="selectConditions.gender" :options="['男', '女']" label="性别" />
      </div>

      <div class="col-2 btns">
        <q-btn outline @click="addUser" color="secondary" icon="add" label="新增" />
        <q-btn outline @click="loadTata" color="primary" icon="search" label="搜索" />
        <q-btn outline @click="reset" color="amber" icon="restart_alt" label="重置" />
      </div>
    </div>

    <!-- 表格 -->
    <q-table :rows="rows" :columns="columns" row-key="name" hide-pagination />
    <div class="pagination">
      <q-pagination boundary-numbers v-model="selectConditions.pageNum" :max="total" max-pages="6" direction-links />
    </div>


    <!-- 新增用户对话框 -->
    <q-dialog v-model="addUserDialog">
      <q-card style="width:30%;">
        <q-card-section>
          <div class="text-h6">新增用户</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input filled v-model="username" :dense="false" label="用户名" />
          <br />
          <q-input filled v-model="password" type="password" :dense="false" label="密码" />
          <br />
          <q-input filled v-model="confirmPassword" type="password" :dense="false" label="确认密码" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="确定" color="primary" @click="submitAddUser" />
          <q-btn flat label="取消" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts" setup >

import type { ISelectConditions, IUserData } from './type';
import { useTableColumn } from "./hooks"
import { reactive, ref, watch } from 'vue';
import { getUserList, insertUser } from '@/api/user';
import { showError, showSuccess } from '@/utils/Notify';

let addUserDialog = ref<boolean>(false);
const total = ref<number>(0);
const username = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");

const columns = useTableColumn();
const rows = ref<Array<IUserData>>([])
let selectConditions = reactive<ISelectConditions>({
  pageNum: 1,
  pageSize: 5,
  username: "",
  nickname: "",
  enabled: null,
  gender: null,
});

const loadTata = () => {

  const requestPayload = JSON.parse(JSON.stringify(selectConditions));

  if (selectConditions.username) {
    requestPayload.username = selectConditions.username;
  }

  if (selectConditions.nickname) {
    requestPayload.nickname = selectConditions.nickname;
  }

  if (selectConditions.enabled) {
    requestPayload.enabled = selectConditions.enabled === "启用" ? 1 : 0;
  }

  if (selectConditions.gender) {
    requestPayload.gender = selectConditions.gender === "男" ? 'MALE' : 'FEMALE';
  }

  getUserList(requestPayload).then(res => {
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

const submitAddUser = () => {

  if (confirmPassword.value !== password.value) {
    showError("两次密码输入不一致");
    return;
  }

  insertUser(username.value, password.value).then(res => {
    const { code, data, message } = res;
    if (code === 200) {
      showSuccess(message);
      loadTata();
      addUserDialog.value = false;
    } else {
      showError(message);
    }
  })
}

const addUser = () => {
  username.value = "";
  password.value = "";
  addUserDialog.value = true;
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
