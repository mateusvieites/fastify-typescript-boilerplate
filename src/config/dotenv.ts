import dotenv from 'dotenv';
dotenv.config();
interface IEnv {
  host: string;
  port: number;
  env: string;
}
enum EEnv {
  HOSTNAME = 'HOSTNAME',
  PORT = 'PORT',
  ENV = 'SERVER_ENVIRONMENT',
}

function loadEnvironmentVariable(keyname: string) {
  if (process.env[keyname])
    return process.env[keyname] as string | number | boolean;
  throw new Error(`Configuration must include ${keyname}`);
}

const env: IEnv = {
  host: loadEnvironmentVariable(EEnv.HOSTNAME) as string,
  port: loadEnvironmentVariable(EEnv.PORT) as number,
  env: loadEnvironmentVariable(EEnv.ENV) as string,
};
export default env;
