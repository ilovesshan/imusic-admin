interface IUserData {
  id: string,
  username: string,
  nickname?: string,
  gender?: string,
  roleList: Array<string>,
  locked: boolean,
  enabled: boolean,
  lastLoginIp?: string,
  createdTime: string,
  updatedTime?: string,
  lastLoginTime?: string,

}

interface ISelectConditions {
  pageSize: number,
  pageNum: number,
  username?: string,
  enabled?: boolean | null,
  gender?: string | null,
}

export {
  IUserData,
  ISelectConditions
}