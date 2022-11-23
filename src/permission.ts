import router from "./router";
import { IUserDetailState } from "./store/modules/user";
import { SCache } from "./utils/cache";
import { showError } from "./utils/Notify";


// 路由拦截
const whileList: Array<string> = ["notFound", "login"];
router.beforeEach((to, from, next) => {
  if (SCache.get("token")) {
    if (to.path === "/login") {
      // 已经登录情况下 不能直接访问登录界面
      next(from.path);
      return;
    }
    // has token
    // 判断是否有权限(根据角色CODE)进入
    const roleList: Array<string> = (SCache.get("userDetail") as IUserDetailState).roleList.map(role => role.name);
    if (roleList.length > 0 && roleList.includes("ROLE_ADMIN")) {
      next();
    } else {
      showError("非管理员用户暂时不能登录后台管理系统");
      next("/login");
    }
  } else {
    // no token
    if (whileList.includes(to.name as string)) {
      // 白名单放行
      next();
    } else {
      // to login page
      next("/login");
    }
  }
})