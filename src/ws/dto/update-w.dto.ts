export class UpdateDeviceStateDto {
  ds_idx: number;
  di_idx: number;
  ds_door: number;
  ds_bat: number;
  ds_collect: number;
  ds_remoteCollect: number;
  ds_stop: number;
}

export class CreateSensorDataDto {
  di_idx: number;
  sd_mos: number;
  sd_ou: number;
}

export class CreateWeatherDataDto {
  di_idx: number;
  wd_temp: number;
  wd_humi: number;
  wd_wdd: number;
  wd_wds: number;
}
