export type IntervalValue =
  | "five_min"
  | "fifteen_min"
  | "one_hour"
  | "three_hour"
  | "six_hour"
  | "one_day"
  | "seven_day";

export interface IGpuLogHistory {
  gpu_id: string;
  name: string;
  interval: IntervalValue;
  timestamp: string[];
  decoder_utilization: number[];
  encoder_utilization: number[];
  memory_util_percent: number[];
  power_draw_mw: number[];
  temp_c: number;
  util_percent: number[];
}
