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
  nickname?: string,
  enabled?: any,
  gender?: any,
}

export {
  IUserData,
  ISelectConditions
}