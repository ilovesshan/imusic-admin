interface IServiceConfig {
  DEV_PROXY_PREFIX: string,
  PRO_PROXY_PREFIX: string,
  DEV_BASE_URL: string,
  PRO_BASE_URL: string,
  DEV_TIME_OUT: number,
  PRO_TIME_OUT: number,
}

const ServiceConfig: IServiceConfig = {
  DEV_PROXY_PREFIX: "/dev_api",
  PRO_PROXY_PREFIX: "/pro_api",
  DEV_BASE_URL: "http://127.0.0.1",
  PRO_BASE_URL: "https://imusic-17670-5-1314961027.sh.run.tcloudbase.com",
  DEV_TIME_OUT: 10000,
  PRO_TIME_OUT: 10000,
}

export default ServiceConfig