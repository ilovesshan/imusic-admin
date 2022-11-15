interface IServiceConfig {
  DEV_BASE_URL: string,
  PRO_BASE_URL: string,
  DEV_TIME_OUT: number,
  PRO_TIME_OUT: number,
}

const ServiceConfig: IServiceConfig = {
  DEV_BASE_URL: " http://127.0.0.1:80",
  PRO_BASE_URL: "https://imusic-17670-5-1314961027.sh.run.tcloudbase.com",
  DEV_TIME_OUT: 10000,
  PRO_TIME_OUT: 10000
}

export default ServiceConfig