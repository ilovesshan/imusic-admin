import router from "./router";
import { SCache } from "./utils/cache";


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
    next();
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