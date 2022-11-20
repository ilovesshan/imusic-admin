import type { ITableColumn } from "@/types/table";
import type { IUserData } from "./type";

const columns: Array<ITableColumn<IUserData>> = [
  {
    name: 'Id',
    label: 'Id',
    align: 'left',
    required: false,
    field: (row: IUserData) => row.id,
    format: (val: string) => `${val}`,
  },
  {
    name: 'username',
    label: '用户名',
    required: false,
    align: 'left',
    field: (row: IUserData) => row.username,
    format: (val: string) => `${val}`,
  },
  {
    name: 'nickname',
    label: '昵称',
    required: false,
    align: 'nickname',
    field: (row: IUserData) => row.nickname || "",
    format: (val: string) => `${val}`,
  },
  {
    name: 'gender',
    label: '性别',
    required: false,
    align: 'gender',
    field: (row: IUserData) => getGenderByCode(row.gender || ""),
    format: (val: string) => `${val}`,
  },
  // {
  //   name: 'locked',
  //   label: '锁定状态',
  //   required: false,
  //   align: 'locked',
  //   field: (row: IUserData) => getLockedByCode(row.locked || null),
  //   format: (val: string) => `${val}`,
  // },
  {
    name: 'enabled',
    label: '状态',
    required: false,
    align: 'enabled',
    field: (row: IUserData) => getEnabledByCode(row.enabled || null),
    format: (val: string) => `${val}`,
  },
  {
    name: 'lastLoginIp',
    label: '登录IP',
    required: false,
    align: 'lastLoginIp',
    field: (row: IUserData) => row.lastLoginIp || "未知",
    format: (val: string) => `${val}`,
  },
  {
    name: 'lastLoginTime',
    label: '最近登录时间',
    required: false,
    align: 'lastLoginTime',
    field: (row: IUserData) => row.lastLoginTime || "",
    format: (val: string) => `${val}`,
  },
  {
    name: 'createdTime',
    label: '创建时间',
    required: false,
    align: 'createdTime',
    field: (row: IUserData) => row.createdTime,
    format: (val: string) => `${val}`,
  },
]


function getGenderByCode(code: string): string {
  if (code === "MALE") {
    return "男"
  } else if (code === "FEMALE") {
    return "女"
  }
  return "未知";
}

// function getLockedByCode(code: boolean | null): string {
//   if (code == true) {
//     return "锁定"
//   } else if (code == false) {
//     return "锁定"
//   }
//   return "未知";
// }

function getEnabledByCode(code: boolean | null): string {
  if (code == true) {
    return "启用"
  } else if (code == false) {
    return "锁定"
  }
  return "未知";
}

export const useTableColumn = () => columns;